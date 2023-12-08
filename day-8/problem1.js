const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

function removeSpace(e) {
    return e.replaceAll(" ", "");
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

let prev = "BPA";
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

console.log(i);
