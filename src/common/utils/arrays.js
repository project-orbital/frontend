/**
 * Groups an array of objects by a key property.
 * Returns an array of the groups, themselves an array of elements in that group.
 *
 * @param array an array of objects to group
 * @param key the key property to group by
 * @return an array of the groups, themselves an array of elements in that group.
 */
export function groupBy(array, key) {
    return Array.from(
        array
            .reduce(
                (acc, elem) =>
                    acc.set(elem[key], [...(acc.get(elem[key]) || []), elem]),
                new Map()
            )
            .values()
    );
}
