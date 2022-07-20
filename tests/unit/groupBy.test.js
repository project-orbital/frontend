import { groupBy } from "../../src/common/utils/arrays";

test("grouping an empty array", async () => {
    expect(groupBy([], "key")).toEqual([]);
});

test("grouping a single-element array", async () => {
    expect(groupBy([{ key: "a" }], "key")).toEqual([[{ key: "a" }]]);
});

test("grouping a multi-element array", async () => {
    const input = [
        { key: "a", value: 1 },
        { key: "a", value: 2 },
        { key: "b", value: 3 },
        { key: "c", value: 4 },
        { key: "c", value: 3 },
        { key: "c", value: 2 },
    ];
    const expected = [
        [
            { key: "a", value: 1 },
            { key: "a", value: 2 },
        ],
        [{ key: "b", value: 3 }],
        [
            { key: "c", value: 4 },
            { key: "c", value: 3 },
            { key: "c", value: 2 },
        ],
    ];
    expect(groupBy(input, "key")).toEqual(expected);
});

test("grouping on an array of non-objects", async () => {
    expect(() => groupBy([123, "abc", new Date()], "key")).toThrow();
});
