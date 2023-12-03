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
        if (element.charAt(boundMin).match(/[0-9]/) == null) {
            boundMin++;
            failed++;
        }

        boundMax++;
        if (element.charAt(boundMax).match(/[0-9]/) == null) {
            boundMax--;
            failed++;
        }
    }

    return [boundMin, boundMax];
}

function getNumbersAroundGear(element, i, j) {
    const prev = splitLine[i - 1] || "";
    const next = splitLine[i + 1] || "";

    const surrounding = [];

    surrounding.push([prev.charAt(j - 1),
        prev.charAt(j), prev.charAt(j + 1)],
        [element.charAt(j - 1), ".", element.charAt(j + 1)],
        [next.charAt(j - 1), next.charAt(j), next.charAt(j + 1)]);

    const returnValue = [];

    const surroundingBase = surrounding.flat();

    for (let i = 0; i < surroundingBase.length && returnValue.length < 2; i++) {
        if (surroundingBase[i].match(/[0-9]/) != null) {
            let from = element;
            let start = 0;
            switch (i) {
                case 0:
                    start = j - 1;
                    from = prev;
                    break;
                case 1:
                    start = j;
                    from = prev;
                    break;
                case 2:
                    start = j + 1;
                    from = prev;
                    break;
                case 3:
                    start = j - 1;
                    break;
                case 5:
                    start = j + 1;
                    break;
                case 6:
                    start = j - 1;
                    from = next;
                    break;
                case 7:
                    start = j;
                    from = next;
                    break;
                case 8:
                    start = j + 1;
                    from = next;
                    break;
            }

            const [min, max] = traceOutNumber(from, start);

            let value = "";

            for (let i = min; i <= max; i++) {
                value += from.charAt(i);
            }

            returnValue.push(parseInt(value));

            if (isNumeric(surroundingBase[i + 1] || ".")) {
                i = Math.floor(i / 3) * 3 + 3;
                continue;
            }

            i++;
        }
    }

    console.log(returnValue);

    return returnValue;
}

let answer = 0;

for (let i = 0; i < splitLine.length; i++) {
    const element = splitLine[i];

    for (let j = 0; j < element.length; j++) {
        if (element.charAt(j) != "*") continue;
        const [a, b] = getNumbersAroundGear(element, i, j);

        if (a == undefined || b == undefined) continue;

        answer += a * b;
    }
}

console.log(answer);