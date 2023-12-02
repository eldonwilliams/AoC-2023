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

    const maximum = {
        red: 0,
        blue: 0,
        green: 0,
    }

    suffles = suffles.forEach((str) => {
        str.split(',').forEach((v) => {
            if (v.startsWith(' ')) v = v.slice(1);
            maximum[v.split(' ')[1]] = Math.max(
                maximum[v.split(' ')[1]],
                parseInt(v.split(' ')[0]),
            );
        });
    });

    if (possible) {
        answer += maximum.red * maximum.blue * maximum.green;
    }
}

console.log(answer);