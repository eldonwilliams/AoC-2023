const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

let splitInput = inputRaw.split('\n');

let HAND_INPUT = [];
let BID_INPUT = [];

for (let i = 0; i < splitInput.length; i++) {
    const line = splitInput[i];
    HAND_INPUT[i] = line.split(' ')[0];
    BID_INPUT[i] = parseInt(line.split(' ')[1]);
}

const charToValue = { "T": 9, "J": 10, "Q": 11, "K": 12, "A": 13 };

for (let i = 2; i <= 9; i++ ) {
    charToValue[i.toString()] = i - 1;
}

function arrayContains1(arr, e) {
    let hit = false;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element != e) continue;

        if (hit) {
            return false;
        } else {
            hit = true;;
        }
    }
    return hit;
}

function arrayContainsAmt(arr, e) {
    let hit = 0;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element != e) continue;
        hit++;
    }
    return hit;
}

// array of functions that test hand, ordered weakest to strongest
const typeClassifier = [
    (hand) => (hand // high card
        .split('')
        .map((char, _, a) => arrayContains1(a, char))
        .reduce((pv, cv) => pv == true && pv == true)),
    (hand) => (hand
        .split('')
        .filter((char, _, a) => arrayContainsAmt(a, char) == 2)
        .length == 2),
    (hand) => (hand
        .split('')
        .filter((char, _, a) => arrayContainsAmt(a, char) == 2)
        .length == 4),
    (hand) => (hand
        .split('')
        .filter((char, _, a) => arrayContainsAmt(a, char) == 3)
        .length == 3),
    (hand) => {
        let twoKind = false;
        let threeKind = false;

        let split = hand.split('');

        twoKind = split
            .filter((char, _, a) => arrayContainsAmt(a, char) == 2)
            .length == 2;

        threeKind = split
            .filter((char, _, a) => arrayContainsAmt(a, char) == 3)
            .length == 3;

        return twoKind && threeKind;
    },
    (hand) => (hand
        .split('')
        .filter((char, _, a) => arrayContainsAmt(a, char) == 4)
        .length == 4),
    (hand) => (hand
        .split('')
        .filter((char, _, a) => arrayContainsAmt(a, char) == 5)
        .length == 5),
]



function getTypeValueOfHand(hand) {
    let value = 0;

    typeClassifier.forEach((v, i) => {
        if (v(hand)) {
            value = i+1;
        }
    })

    return value;
}

function getHighestOfHands(hands) {
    let typeValues = new Array();

    hands.forEach((h, i) => {
        typeValues[i] = getTypeValueOfHand(h.v);
    })

    let highestTypeValue = 0;

    for (let i = 0; i < typeValues.length && highestTypeValue < 7; i++) {
        const value = typeValues[i];
        highestTypeValue = Math.max(value, highestTypeValue);
    }

    let testHands = hands.filter((h, i) => typeValues[i] >= highestTypeValue);
    

    for (let i = 0; i < 5 && testHands.length > 1; i++) {
        let highestPositionValue = '2';

        for (let j = 0; j < testHands.length; j++) {
            const hand = testHands[j].v;
            if (charToValue[hand[i]] > charToValue[highestPositionValue]) {
                highestPositionValue = hand[i];
            }
        }

        testHands = testHands.filter(v => v.v[i] == highestPositionValue);
    }

    return testHands[0];
}

function sortHand(hands) {
    let ans = []

    while (hands.length > 0) {
        let highest = getHighestOfHands(hands);
        ans.unshift(highest);
        hands = hands.filter(v => v.v != highest.v);
    }

    return ans;
}

function getTotalWinnings(hands, bid) {
    let sorted = sortHand(hands.map((v, i) => ({ v, i })));

    let winnings = 0;

    sorted.forEach((v, i) => {
        winnings += (i + 1) * bid[v.i];
    })

    return winnings
}

console.log(getTotalWinnings(HAND_INPUT, BID_INPUT))