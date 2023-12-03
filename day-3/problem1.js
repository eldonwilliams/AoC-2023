const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

/**
 * Is the char a symbol (DEFINITION)
 * @param {*} str 
 * @returns 
 */
const isSymbol = (str) => str != "." && str.match(/[0-9]/) == null && (str == "*" || str == "#" || str == "+" || str == "$" || str == "=" || str == "/" || str == "-" || str == "%" || str == "@" || str == "&");

const rows = inputRaw.split('\n');

let answer = 0;

for (let i = 0; i < rows.length; i++) {
    const element = rows[i];
    for (let j = 0; j < element.length; j++) {
        if (element.charAt(j).match(/[0-9]/) == null) continue;
        let startOfNum, endOfNum;
        startOfNum = j;
        let curNum = j;
        while (element.charAt(curNum).match(/[0-9]/) != null) {
            curNum++;
        }
        endOfNum = curNum;
        j = endOfNum;

        let good = false;
        let value = "";

        for (let k = startOfNum; k < endOfNum; k++) {
            const prev = rows[i - 1] || "";
            const next = rows[i + 1] || "";
            const surrounding = [];

            if (prev == undefined) {
                surrounding.push(null, null, null);
            } else {
                surrounding.push(prev.charAt(k - 1), prev.charAt(k), prev.charAt(k + 1));
            }

            surrounding.push(element.charAt(k - 1), element.charAt(k + 1));

            value += element.charAt(k);

            if (next == undefined) {
                surrounding.push(null, null, null);
            } else {
                surrounding.push(next.charAt(k - 1), next.charAt(k), next.charAt(k + 1));
            }

            surrounding.forEach((v) => {
                if (isSymbol(v)) {
                    
                    console.log(v);
                    good = true;
                }
            })
        }

        if (good) {
            console.log(value);
            answer += parseInt(value);
        }
    }
}

console.log(answer);