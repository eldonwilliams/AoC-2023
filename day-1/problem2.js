const fs = require('fs');
const { exit } = require('process');

const fileInputRaw = fs.readFileSync('./input').toString("ascii");

if (fileInputRaw == null) exit();

let answer = 0;
const values = fileInputRaw.split('\n');

const spelledValues = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];

/**
 * 
 * @param {string} split 
 * @param {number} position 
 * @returns {number}
 */
function checkSpell(split, position) {
    let runs = new Array(spelledValues.length).fill('');

    let answer = -1;

    let rep = 0;
    for (let i = position; i < Math.min(position + 5, split.length); i++) {
        let t = split[i];
        spelledValues.forEach((spelled, index) => {
            if (runs[index].length != rep) return;
            if (spelled[rep] == t) {
                runs[index] += t;
            }
            if (spelled == runs[index]) {
                answer = index + 1;
            }
        });
        rep++;
    }

    return answer;
}

values.forEach((s) => {
    let curValue = 0;

    let hit = false;

    const split = s.split('');

    for (let i = 0; i < split.length && !hit; i++) {
        let t = split[i];
        if (checkSpell(split, i) > 0) {
            curValue += checkSpell(split, i) * 10;
            hit = true;
        }
        if (parseInt(t) >= 0) {
            curValue += parseInt(t) * 10;
            hit = true;
        }
    }

    hit = false;

    for (let i = split.length - 1; i >= 0 && !hit; i--) {
        let t = split[i];
        if (checkSpell(split, i) > 0) {
            curValue += checkSpell(split, i);
            hit = true;
        }
        if (parseInt(t) >= 0) {
            curValue += parseInt(t);
            hit = true;
        }
    }

    answer += curValue;
});

console.log(answer);