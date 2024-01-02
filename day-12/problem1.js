const fs = require('fs');

const inputRaw = fs.readFileSync('input').toString('ascii');

function isNumeric(e) {
    return e.match(/[0-9]/) != null;
}

function removeSpace(e) {
    return e.replaceAll(" ", "");
}

/**
 * Gets the number of times a char repeats count times, and only req times.
 * @param {string} str 
 * @param {string} char 
 * @param {number} req 
 */
function stringContigiousNumOfChar(str, char, req) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != char.charAt(0)) continue;

        let start = i;
        while (str.charAt(i) == char.charAt(0)) i++;

        let length = i - start;
        if (length == req) count++;
    }

    return count;
}

function getLengthOfCharSequence(str, i) {
    let length = 1;

    let j = i + 1;
    while (str.charAt(i) == str.charAt(j)) {
        j++;
        length++;
    }

    return length;
}

function getNextIndexOfChar(str, i, char) {
    let j = i;
    let hit = false;
    for (; j < str.length; j++) {
        if (str.charAt(j) == char.charAt(0)) {
            hit = true;
            break;
        }
    }
    if (!hit) return -1;
    return j;
}

function getNextIndexOfTimeCharOccursNTimes(str, char, i, n) {
    let ans = i;
    while (ans < str.length) {
        ans = getNextIndexOfChar(str, ans, char);
        if (ans == -1) {
            return -1;
        }
        if (n == getLengthOfCharSequence(str, ans)) {
            return ans;
        }
    }
    return -1;
}

/**
 * Gets the number of times char occurs before i
 * @param {string} str 
 * @param {number} i 
 * @param {string} char 
 */
function countCharsPrevious(str, i, char) {
    if (i <= 0) return 0;
    let count = 0;
    for (let j = i; i >= 0; i--) {
        if (str.charAt(j) == char.charAt(0)) {
            count++;
        }
    }
    return count;
}

let splitInput = inputRaw.split('\n');

splitInput = splitInput.map((rawStr) => {

    let str = rawStr.split(' ')[0];
    let nums = rawStr.split(' ')[1].split(',').map(v => parseInt(v));
    let numUnknown = str.split('').filter(s => s == "?").length;
    let count = 0;

    for (let i = 0; i < Math.pow(2, numUnknown); i++) {
        let nth = -1;
        let checkStr = str.split('').map((v, j) => {
            if (v != "?") return v;
            nth++;
            if ((i & 1 << nth) > 0) {
                return "#"
            }
            return "."
        }).join('')
        
        let ogString = checkStr;

        let passes = false;

        if (passes) {
            console.log(ogString)
            count++
        }
    }

    return count;
})

console.log(splitInput.reduce((pv, cv) => pv + cv, 0));

console.log(getNextIndexOfTimeCharOccursNTimes("#...##..#.###.", "#", 2, 1))