const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

const cards = inputRaw.split('\n');

let answer = 0;

function contains(arr, l) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element == l) return true;
    }
    return false;
}

for (let i = 0; i < cards.length; i++) {
    const card = cards[i].split(':')[1];

    let [winningNumbers, numbers] = card.split('|');

    winningNumbers = winningNumbers.split(' ').map(v => parseInt(v));
    numbers = numbers.split(' ').map(v => parseInt(v));

    let value = 0;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (contains(winningNumbers, number)) {
            if (value == 0) {
                value = 1;
            } else {
                value *= 2;
            }
        }
    }

    answer += value;
}

console.log(answer);