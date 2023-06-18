import * as _ from "lodash";

export const compareArrays = (currentArray,newArray) : {deleted: any[], added : any[]} => {
    const deleted = _.difference(currentArray, newArray);
    const added = _.difference(newArray, currentArray);
    return {deleted,added}
}

export const isEmpty = (value: string | number | object ): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    } else {
        return false;
    }
}