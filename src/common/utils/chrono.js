/**
 * Returns the chronologically newest element in an array,
 * given a function which extracts the Date object from an element in the array.
 *
 * If this extractor function is not specified, the array is assumed to be an
 * array of objects with a `date` key.
 *
 * Returns `null` on empty arrays.
 *
 * @param data an array of chronologically unsorted elements
 * @param dateExtractorFn (optional) a function to extract the Date object from an element
 * @return the chronologically newest element in an array
 */
import { compareAsc } from "date-fns";

export function newest(data, dateExtractorFn = (elem) => elem.date) {
    if (data.length === 0) {
        return null;
    }
    // Check for internal type errors.
    for (const e of data) {
        if (!(e instanceof Object)) {
            throw new TypeError("data must be an array of objects");
        }
        if (!(dateExtractorFn(e) instanceof Date)) {
            throw new TypeError("dateExtractorFn must return a Date object");
        }
    }
    return data.reduce(
        (acc, elem) =>
            dateExtractorFn(elem) > dateExtractorFn(acc) ? elem : acc,
        data[0] // There will always be at least 1 transaction at this point.
    );
}

/**
 * Returns a new array with only the chronologically newest elements in the
 * original array which meet the condition specified by a boundary function.
 * The returned array is sorted chronologically.
 *
 * For example if we have an array of dates called `dates`,
 * `discretize(dates, isSameMonth)` will return an array of only the latest days
 * in each month.
 *
 * In this case, `isSameMonth` from `date-fns` is a function which takes
 * 2 Date objects and returns `true` if they fall in the same month, and `false` otherwise.
 *
 * A date extractor function can be provided to extract dates from each object
 * of the array. If this extractor function is not specified, the array is
 * assumed to be an array of objects with a `date` key.
 *
 * @param data an array of chronologically unsorted elements
 * @param boundaryFn a 2-argument function which takes 2 Date objects and returns
 * whether they should considered to be in the same group, of which the most recent
 * is chosen as the representative element of the group
 * @param dateExtractorFn (optional) a function to extract the Date object from an element
 * @return a new array with only the chronologically newest elements in the
 * original array which meet the condition specified by a boundary function
 */
export function discretize(
    data,
    boundaryFn,
    dateExtractorFn = (elem) => elem.date
) {
    if (data.length === 0) {
        return null;
    }
    // Check for internal type errors.
    for (const e of data) {
        if (!(e instanceof Object)) {
            throw new TypeError("data must be an array of objects");
        }
        if (!(dateExtractorFn(e) instanceof Date)) {
            throw new TypeError("dateExtractorFn must return a Date object");
        }
    }
    const sorted = data
        .slice()
        .sort((a, b) => compareAsc(dateExtractorFn(a), dateExtractorFn(b)));
    return sorted.slice(1).reduce(
        (acc, elem) => {
            const last = acc[acc.length - 1];
            if (boundaryFn(last, elem)) {
                acc[acc.length - 1] = elem;
            } else {
                acc.push(elem);
            }
            return acc;
        },
        [sorted[0]]
    );
}
