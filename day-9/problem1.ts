import fs from 'fs';
import { countArray } from '../shared';

let inputRaw = fs.readFileSync('input').toString('ascii');
let lineSplit = inputRaw.split('\n');

type reportLine = number[];
type reportExtrapolated = number[][];

let reports: reportLine[] = [];

lineSplit.forEach(v => {
    reports.push(
        v.split(' ').map(v => parseInt(v))
    )
});

function makeSequence(report: reportLine): reportExtrapolated {
    let answer = [report];

    while (countArray(answer.at(-1)!, 0) != answer.at(-1)?.length) {
        let build = [];

        let array = answer.at(-1)!;
        for (let i = 0; i < array.length - 1; i++) {
            build.push(array[i + 1] - array[i]);
        }

        answer.push(build);
    }

    return answer;
}

function extrapolate(report: reportExtrapolated) {
    report.at(-1)!.push(0);

    for (let i = report.length - 1; i > 0; i--) {
        const line = report[i];
        const previous = report[i - 1];
        report.at(i - 1)?.push(line.at(-1)! + previous.at(-1)!);
    }

    return report;
}

let sum = 0;

reports.forEach(v => {
    let a = extrapolate(makeSequence(v));
    sum += a[0].at(-1)!;
})

console.log(sum);