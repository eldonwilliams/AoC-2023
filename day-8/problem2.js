const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

function removeSpace(e) {
    return e.replaceAll(" ", "");
}

function greatestCommonFactor(a, b) {

    let highest = 1;
    for (let i = 2; i <= Math.min(a, b); i++) {
        if (a % i == 0 && b % i == 0) {
            highest = i;
        }
    }
    return highest;
}

function isCoprime(a, b) {
    return greatestCommonFactor(a, b) == 1;
}

function greatestCommonFactorSet(arr) {
    let highest = 1;
    let min = arr.reduce((pv, cv) => Math.min(pv, cv), 0);
    for (let i = 2; i <= min; i++) {
        if (arr.reduce((pv, cv) => pv && cv % i == 0), true) {
            highest = i;
        }
    }
    return highest;
}

function lcm(arr) {
    let min = arr.reduce((pv, cv) => Math.min(pv, cv), 0);
    for (let i = 2; i <= min; i++) {
        if (arr.reduce((pv, cv) => pv && cv % i == 0), true) {
            return i;
        }
    }
    return 1;
}

function getStepsToZ(code) {
    let prev = code;
    let i = 0;

    while (prev[prev.length - 1] != "Z") {
        let curInstruct = instruction[i % (instruction.length)];

        let [left, right] = inputs[prev];

        if (curInstruct == "L")
            prev = left;
        else
            prev = right;

        i++;
    }

    return i;
}

let splitInput = inputRaw.split('\n');

let instruction = splitInput.shift();
splitInput.shift();

let inputs = {}

splitInput.forEach((v) => {
    let start = removeSpace(v.split('=')[0]);

    let parenth = removeSpace(v.split('=')[1]);

    inputs[start] = parenth.replaceAll('(',"").replaceAll(")","").split(',')
});

let prev = Object.keys(inputs).filter(v => v[v.length - 1] == "A");
let i = 0;

let steps = prev.map(v => getStepsToZ(v));

console.log(steps);

// i just used my ti-84 to find lcm cause its 12
// just multiply the lcm, this was my first thought
// but implementation got me! uhh
// still second :)

console.log(lcm(steps))

// let gcfs = greatestCommonFactorSet(steps);

// console.log(Object.keys(hashSetSteps).reduce((pv, cv) => {
//     return pv * (cv / gcfs);
// }, 1));


