const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("liabilities", () => {
    test.beforeEach(async ({ page }) => {
        // Sign in
        await page.goto("http://localhost:3000/sign-in");
        await page.fill("text=Username", process.env.TESTING_USERNAME);
        await page.fill("text=Password", process.env.TESTING_PASSWORD);
        await page.locator('button:has-text("Sign in")').click();
        await expect(page).toHaveURL("http://localhost:3000/dashboard");

        // Go to Settings
        await page.locator('div:has-text("settings")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/settings");

        // Erase all data
        await page.locator('a:has-text("Erase data")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/settings/erase-data"
        );
        await page.fill(
            "text=Enter your password to confirm.",
            process.env.TESTING_PASSWORD
        );
        await page.locator('button:has-text("Erase data")').click();
        await expect(page).toHaveURL("http://localhost:3000/settings/");

        // Go to portfolio
        await page.locator('div:has-text("portfolio")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio");
    });

    test("liabilities create/read/update/delete process", async ({ page }) => {
        // Create 2 liabilities:
        // 1. from portfolio onboarding "no assets or liabilities yet" w/ description
        await page.locator('a:has-text("Add a liability")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/portfolio/liabilities/create"
        );
        await page.locator('[name="name"]').fill("Liability #1");
        await page
            .locator('textarea[name="description"]')
            .fill("A description.");
        await page.locator('select[name="category"]').selectOption("Bills");
        await page.locator('input[name="amount"]').fill("10000.99");
        await page.locator('input[name="amount"]').fill("12345.67");
        await page.locator('input[name="interest"]').fill("9.87");
        await page.locator("text=Add liability").click();
        await expect(page).toHaveURL(
            "http://localhost:3000/portfolio/liabilities/"
        );

        // 2. from portfolio overview "created another asset", w/o description
        await page.locator('a:has-text("Add a liability")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/portfolio/liabilities/create"
        );
        await page.locator('[name="name"]').fill("Liability #2");
        await page.locator('select[name="category"]').selectOption("Credit");
        await page.locator('input[name="amount"]').fill("2345.67");
        await page.locator('input[name="interest"]').fill("0.98");
        await page.locator("text=Add liability").click();
        await expect(page).toHaveURL(
            "http://localhost:3000/portfolio/liabilities/"
        );

        // Update 2 liabilities:
        // 1. w/o description
        await page.locator('a:has-text("Edit")').first().click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/liabilities\/\w+\/update/
        );
        await page.locator('[name="name"]').fill("Liability #1 Edited");
        await page.locator('textarea[name="description"]').fill("");
        await page.locator('select[name="category"]').selectOption("Debt");
        await page.locator('input[name="amount"]').fill("23456.78");
        await page.locator('input[name="interest"]').fill("1.23");
        await page.locator("text=Update liability").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");

        // 2. w/ description
        await page.locator('a:has-text("Edit")').nth(1).click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/liabilities\/\w+\/update/
        );
        await page.locator('[name="name"]').fill("Liability #2 Edited");
        await page
            .locator('textarea[name="description"]')
            .fill("A new description.");
        await page.locator('select[name="category"]').selectOption("Loans");
        await page.locator('input[name="amount"]').click();
        await page.locator('input[name="amount"]').fill("123.45");
        await page.locator('input[name="interest"]').fill("9999.99");
        await page.locator("text=Update liability").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");

        // Delete two assets, sequentially, to check that order of deletion is correct.
        // 1.
        await page.locator('a:has-text("Delete")').first().click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/liabilities\/\w+\/delete/
        );
        await page.locator("text=Yes, delete records").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");

        // 2.
        await page.locator('a:has-text("Delete")').click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/liabilities\/\w+\/delete/
        );
        await page.locator("text=Yes, delete records").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");
    });
});
