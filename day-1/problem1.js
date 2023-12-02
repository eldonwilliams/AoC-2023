const fs = require('fs');
const { exit } = require('process');

const fileInputRaw = fs.readFileSync('./input').toString("ascii");

if (fileInputRaw == null) exit();

let answer = 0;
const values = fileInputRaw.split('\n');

values.forEach((s) => {
    let curValue = 0;

    let hit = false;

    s.split('').forEach((t) => {
        if (hit) return;
        if (parseInt(t) >= 0) {
            curValue += parseInt(t) * 10;
            hit = true;
        }
    });

    const split = s.split('');
    hit = false;

    for (let i = split.length - 1; i >= 0 && !hit; i--) {
        let t = split[i];
        if (parseInt(t) >= 0) {
            curValue += parseInt(t);
            hit = true;
        }
    }

    answer += curValue;
});

console.log(answer);