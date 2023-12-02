const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

const gamesInput = inputRaw.split('\n');

const colors = {
    red: 12,
    green: 13,
    blue: 14
}

let answer = 0;

for (let i = 0; i < gamesInput.length; i++) {
    let gameInput = gamesInput[i];
    let id = parseInt(gameInput.match(/([0-9]+)/)[0]);

    let possible = true;
    let suffles = gameInput.split(';');

    suffles[0] = suffles[0].split(' ').slice(2).join(' ');

    suffles = suffles.map((str) => {
        const parts = [];
        str.split(',').forEach((v) => {
            if (v.startsWith(' ')) v = v.slice(1);
            parts.push({
                color: v.split(' ')[1],
                value: parseInt(v.split(' ')[0]),
            })
        });
        return parts;
    });

    for (let i = 0; i < suffles.length && possible; i++) {
        suffles[i].forEach((part) => {
            console.log(part);
            if (colors[part.color] < part.value) {
                possible = false;
            }
        })
    }

    if (possible) {
        answer += id;
    }
}

console.log(answer);