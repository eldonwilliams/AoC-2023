export function isNumerical(str: string): boolean {
    return str.match(/([0-9]+)/) !== null;
}

export function countArray<T>(arr: T[], element: T): number {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        if (element == e) {
            count++;
        }
    }
    return count;
}

export function arrayHas<T>(arr: T[], element: T): boolean {
    return arr.indexOf(element) != -1;
}