import { computeBalances } from "../../src/common/utils/balance";
import currency from "currency.js";

test("computing balances without any transactions", async () => {
    expect(computeBalances([])).toEqual([]);
});

test("computing balances with a single transaction", async () => {
    const today = new Date();
    const input = [
        { data: today, balance: currency(100), amount: currency(0) },
    ];
    expect(computeBalances(input)).toEqual(input);
});

test("computing balances with multiple transactions with full balance information", async () => {
    const input = [
        {
            date: new Date(2020, 6, 6),
            balance: currency(100),
            amount: currency(0),
        },
        {
            date: new Date(2020, 6, 6),
            balance: currency(100),
            amount: currency(0),
        },
        {
            date: new Date(2020, 6, 6),
            balance: currency(100),
            amount: currency(0),
        },
    ];
    expect(computeBalances(input)).toEqual(input);
});

test("computing balances with multiple transactions with only one source of balance information", async () => {
    const input = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(0),
            amount: currency(400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(1000),
            amount: currency(800),
        },
        {
            date: new Date(2020, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
        {
            date: new Date(2019, 6, 6),
            balance: currency(0),
            amount: currency(400),
        },
    ];
    const expected = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(1200),
            amount: currency(400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(800),
            amount: currency(-200),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(1000),
            amount: currency(800),
        },
        {
            date: new Date(2020, 6, 6),
            balance: currency(200),
            amount: currency(-200),
        },
        {
            date: new Date(2019, 6, 6),
            balance: currency(400),
            amount: currency(400),
        },
    ];
    expect(computeBalances(input)).toEqual(expected);
});

test("computing balances with multiple transactions with multiple sources of balance information", async () => {
    const input = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(0),
            amount: currency(400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(1000),
            amount: currency(800),
        },
        {
            date: new Date(2020, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
        {
            date: new Date(2019, 6, 6),
            balance: currency(4000),
            amount: currency(400),
        },
        {
            date: new Date(2018, 6, 6),
            balance: currency(0),
            amount: currency(-800),
        },
        {
            date: new Date(2017, 6, 6),
            balance: currency(0),
            amount: currency(1600),
        },
    ];
    const expected = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(1200),
            amount: currency(400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(800),
            amount: currency(-200),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(1000),
            amount: currency(800),
        },
        {
            date: new Date(2020, 6, 6),
            balance: currency(200),
            amount: currency(-200),
        },
        {
            date: new Date(2019, 6, 6),
            // Added a source of conflict here, which it is expected to treat as the truth.
            balance: currency(4000),
            amount: currency(400),
        },
        {
            date: new Date(2018, 6, 6),
            balance: currency(3600),
            amount: currency(-800),
        },
        {
            date: new Date(2017, 6, 6),
            balance: currency(4400),
            amount: currency(1600),
        },
    ];
    expect(computeBalances(input)).toEqual(expected);
});

// Edge case
test("computing balances with multiple transactions with all zero balances", async () => {
    const input = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(0),
            amount: currency(-400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(0),
            amount: currency(800),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
    ];
    const expected = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(400),
            amount: currency(-400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(800),
            amount: currency(800),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
        // Expected to assume that the balance before this here is 200 so we end up with 0.
    ];
    expect(computeBalances(input)).toEqual(expected);
});

// Edge case (bounds check)
test("computing balances with multiple transactions with balance at the start", async () => {
    const input = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(1000),
            amount: currency(-400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(0),
            amount: currency(800),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(0),
            amount: currency(-200),
        },
    ];
    const expected = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(1000),
            amount: currency(-400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(1400),
            amount: currency(800),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(600),
            amount: currency(-200),
        },
    ];
    expect(computeBalances(input)).toEqual(expected);
});

// Edge case (bounds check)
test("computing balances with multiple transactions with balance at the end", async () => {
    const input = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(0),
            amount: currency(-400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(0),
            amount: currency(800),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(1000),
            amount: currency(-200),
        },
    ];
    const expected = [
        {
            date: new Date(2023, 6, 6),
            balance: currency(1400),
            amount: currency(-400),
        },
        {
            date: new Date(2022, 6, 6),
            balance: currency(1800),
            amount: currency(800),
        },
        {
            date: new Date(2021, 6, 6),
            balance: currency(1000),
            amount: currency(-200),
        },
    ];
    expect(computeBalances(input)).toEqual(expected);
});
