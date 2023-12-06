const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

let races = []

let timeLine = inputRaw.split('\n')[0].split(':');
timeLine.shift();
timeLine = timeLine[0].split(' ').filter(v => isNumeric(v));
timeLine = timeLine.map(v => parseInt(v));

let distanceLine = inputRaw.split('\n')[1].split(':');
distanceLine.shift();
distanceLine = distanceLine[0].split(' ').filter(v => isNumeric(v));
distanceLine = distanceLine.map(v => parseInt(v));

for (let i = 0; i < timeLine.length; i++) {
    races[i] = [];
    races[i][0] = timeLine[i];
    races[i][1] = distanceLine[i];
}

let margin = 0;

for (let i = 0; i < races.length; i++) {
    const [time, dist] = races[i];

    let waysToWin = 0;

    for (let j = 0; j < time; j++) {
        let newDist = (time - j) * j;

        if (newDist > dist) waysToWin++;
    }

    if (margin == 0) {
        margin = waysToWin;
    } else {
        margin *= waysToWin;
    }
}

console.log(margin)