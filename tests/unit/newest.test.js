import { newest } from "../../src/common/utils/chrono";

test("newest on an empty array", async () => {
    const input = [];
    const result = newest(input);
    expect(result).toBeNull();
});

test("newest on a single-element array", async () => {
    const input = [{ date: new Date() }];
    const result = newest(input);
    expect(result).toEqual(input[0]);
});

test("newest on a single-element array requiring extraction", async () => {
    const input = [{ indirection: new Date() }];
    const result = newest(input, (e) => e.indirection);
    expect(result).toEqual(input[0]);
});

test("newest on a multi-element array requiring extraction", async () => {
    const input = [
        { indirection: new Date(2021, 6, 14), value: "b" },
        { indirection: new Date(2021, 7, 14), value: "b" },
        { indirection: new Date(2022, 9, 14), value: "a" },
        { indirection: new Date(2022, 8, 14), value: "a" },
        { indirection: new Date(2020, 8, 14), value: "c" },
    ];
    const result = newest(input, (e) => e.indirection);
    expect(result).toEqual({ indirection: new Date(2022, 9, 14), value: "a" });
});

// We don't want type errors to fail silently.
test("newest on non-date values", async () => {
    const input = [
        { date: new Date() },
        { date: "01 Jan 1970" },
        { date: new Date() },
    ];
    const action = () => newest(input);
    expect(action).toThrow();
});

test("newest on extracted non-date values", async () => {
    const input = [
        { indirection: new Date() },
        { indirection: "01 Jan 1970" },
        { indirection: new Date() },
    ];
    const action = () => newest(input, (e) => e.indirection);
    expect(action).toThrow();
});

test("newest on an array of non-objects", async () => {
    const input = ["abcd", 1234, new Date()];
    const action = () => newest(input, (e) => e.indirection);
    expect(action).toThrow();
});
