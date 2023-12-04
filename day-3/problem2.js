const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

const splitLine = inputRaw.split('\n');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

function traceOutNumber(element, start) {
    let boundMin = start;
    let boundMax = start;

    let failed = 0;

    while (failed != 2) {
        failed = 0;
        boundMin--;
        if (!isNumeric(element.charAt(boundMin))) {
            boundMin++;
            failed++;
        }

        boundMax++;
        if (!isNumeric(element.charAt(boundMax))) {
            boundMax--;
            failed++;
        }
    }

    return [boundMin, boundMax];
}

function getNumbersAround(i, j) {
    const current = splitLine[i];
    const prev = splitLine[i - 1] || "";
    const next = splitLine[i + 1] || "";

    const segments = [prev, current, next];

    const value = [];

    for (let k = 0; k < segments.length; k++) {
        const segment = segments[k];
        let hitNum = false;
        for (let i = j - 1; i <= j + 1 && value.length < 2; i++) {
            console.log(segment);
            if (isNumeric(segment[i] || ".") && !hitNum) {
                hitNum = true;
                const [min, max] = traceOutNumber(segment, i);

                let v = "";

                for (let j = min; j <= max; j++) {
                    v += segment[j];
                }

                value.push(parseInt(v));
            }
            
            if (!isNumeric(segment[i] || ".")) {
                hitNum = false;
            }
        }
    }

    return value;
}

let answer = 0;

for (let i = 0; i < splitLine.length; i++) {
    for (let j = 0; j < splitLine[i].length; j++) {
        if (splitLine[i] && splitLine[i][j] == "*") {
            const [a, b] = getNumbersAround(i, j);

            if (a == undefined || b == undefined) continue;

            answer += a * b;
        }
    }
}

console.log(answer);