import { discretize } from "../../src/common/utils/chrono";
import { isSameMonth } from "date-fns";

test("discretizing an empty array", async () => {
    const data = [];
    const result = discretize(data, () => true);
    expect(result).toBeNull();
});

test("discretizing a single-element array", async () => {
    const data = [{ date: new Date() }];
    const result = discretize(data, () => true);
    expect(result).toEqual([data[0]]);
});

// We don't want type errors to fail silently.
test("discretizing a single-element array with a non-date value", async () => {
    // discretize shouldn't accept date strings, which are a common source of type errors
    const data = [{ date: "01 Jan 1970" }];
    const action = () => discretize(data, () => true);
    expect(action).toThrow();
});

test("discretizing a single-element array with custom date extractor", async () => {
    const data = [{ indirection: new Date() }];
    const result = discretize(
        data,
        () => true,
        (elem) => elem.indirection
    );
    expect(result).toEqual([data[0]]);
});

test("discretizing a single-element array with custom boundary function", async () => {
    const data = [{ date: new Date() }];
    // This will reject every other element.
    const result = discretize(data, () => false);
    expect(result).toEqual([data[0]]);
});

test("discretizing a single-element array with custom date extractor and boundary function", async () => {
    const data = [{ indirection: new Date() }];
    const result = discretize(
        data,
        // This will reject every other element.
        () => false,
        (elem) => elem.indirection
    );
    expect(result).toEqual([data[0]]);
});

test("discretizing a multi-element array by month", async () => {
    const data = [
        { indirection: new Date(2022, 9, 14) },
        { indirection: new Date(2022, 7, 14) },
        { indirection: new Date(2022, 8, 14) },
    ];
    const result = discretize(
        data,
        (a, b) => isSameMonth(a.indirection, b.indirection),
        (elem) => elem.indirection
    );
    expect(result).toEqual([
        { indirection: new Date(2022, 7, 14) },
        { indirection: new Date(2022, 8, 14) },
        { indirection: new Date(2022, 9, 14) },
    ]);
});

test("discretizing a multi-element array by some other value", async () => {
    const data = [
        { indirection: new Date(2022, 9, 14), value: "a" },
        { indirection: new Date(2022, 8, 14), value: "a" },
        { indirection: new Date(2021, 6, 14), value: "b" },
        { indirection: new Date(2021, 7, 14), value: "b" },
        { indirection: new Date(2020, 8, 14), value: "c" },
    ];
    const result = discretize(
        data,
        // This will result in an array with the newest element for each value.
        (a, b) => a.value === b.value,
        (elem) => elem.indirection
    );
    expect(result).toEqual([
        { indirection: new Date(2020, 8, 14), value: "c" },
        { indirection: new Date(2021, 7, 14), value: "b" },
        { indirection: new Date(2022, 9, 14), value: "a" },
    ]);
});

// We don't want type errors to fail silently.
test("discretizing a multi-element array with some non-date values", async () => {
    // discretize shouldn't accept date strings, which are a common source of type errors
    const data = [
        { indirection: "01 Jan 1970" },
        { indirection: new Date() },
        { indirection: "01 Jan 1971" },
    ];
    const action = () =>
        discretize(
            data,
            () => true,
            (elem) => elem.indirection
        );
    expect(action).toThrow();
});

test("discretizing a multi-element array with some non-objects", async () => {
    // discretize shouldn't accept date strings, which are a common source of type errors
    const data = [
        { indirection: "01 Jan 1970" },
        { indirection: new Date() },
        new Date(),
    ];
    const action = () =>
        discretize(
            data,
            () => true,
            (elem) => elem.indirection
        );
    expect(action).toThrow();
});
