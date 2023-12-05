const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

const seedMapping = {}

const lineSplit = inputRaw.split('\n');

const mapsList = lineSplit.filter(v => v.match("map") != null);
const mapsIndex = lineSplit.map((v, i) => {
    if (v.match("map") != null)
        return i;
    else
        return null;
}).filter(v => v != null);

const maps = {};

mapsList.forEach((v, i) => {
    const index = mapsIndex[i];

    let [input, _, output] = v.split('-');
    output = output.split(' ')[0];

    maps[[input, output]] = [];

    let k = index + 1;
    for (; k < lineSplit.length && isNumeric(lineSplit[k]); k++) {
        const currentLine = lineSplit[k];
        let nums = currentLine.split(' ');
        let [a, b, length] = nums.map(v => parseInt(v));

        if (true) {
            let hold = a;
            a = b;
            b = hold;
        }

        maps[[input, output]].push((x) => {
            if (x >= a && x <= a + length) {
                return b - a + x;
            } else
                return null;
        });
    }
});

function getNumValue(index, value) {
    let ret = null;

    maps[index].forEach(fn => {
        if (fn && fn(value) != null) {
            ret = fn(value);
        }
    });

    return ret || value;
}

function getLocation(seed) {
    let prev = seed;

    for (let map in maps) {
        
        prev = getNumValue(map, prev);
    }

    return prev;
}

let seeds = lineSplit[0].split(' ')
seeds.shift()

seeds = seeds.map((v) => parseInt(v.match(/([0-9]+)/)));

console.log(seeds.map(v => getLocation(v)).sort());
console.log(seeds.map(v => getLocation(v)).sort().map(v => Math.log10(v)));