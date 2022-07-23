/**
 * Groups an array of objects by a key property.
 * Returns an array of the groups, themselves an array of elements in that group.
 *
 * @param data an array of objects to group
 * @param key the key property to group by
 * @return an array of the groups, themselves an array of elements in that group.
 */
export function groupBy(data, key) {
    return Array.from(
        data
            .reduce((acc, elem) => {
                if (!(elem instanceof Object)) {
                    throw new TypeError("data must be an array of objects");
                }
                return acc.set(elem[key], [
                    ...(acc.get(elem[key]) || []),
                    elem,
                ]);
            }, new Map())
            .values()
    );
}
