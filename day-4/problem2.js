const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

let cards = inputRaw.split('\n');

function contains(arr, l) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element == l) return true;
    }
    return false;
}

const copies = new Map();

for (let i = 0; i < cards.length && i < 300; i++) {
    const cardNum = cards[i].match(/([0-9]+)/);
    const card = cards[i].split(':')[1];

    let [winningNumbers, numbers] = card.split('|');

    winningNumbers = winningNumbers.split(' ').map(v => parseInt(v));
    numbers = numbers.split(' ').map(v => parseInt(v));

    let value = 0;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (contains(winningNumbers, number)) {
            value++;
        }
    }

    let copiesOfSelf = (copies.get(i) || 0) + 1;

    for (let j = i + 1; j < cards.length && j - i <= value; j++) {
        copies.set(j, ((copies.get(j) || 0)) + copiesOfSelf);
    }
}

let answer = cards.length;

copies.forEach(v => answer += v);

console.log(answer);