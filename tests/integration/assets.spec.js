const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("assets", () => {
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

    test("asset create/read/update/delete process", async ({ page }) => {
        // Create 2 assets:
        // 1. from portfolio onboarding "no assets or liabilities yet"
        await page.locator('a:has-text("Add an asset")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/portfolio/assets/create"
        );
        await page.locator('[name="name"]').fill("Asset #1");
        await page.locator('[name="symbol"]').fill("AST1");
        await page.locator('select[name="category"]').selectOption("Bonds");
        await page.locator('input[name="price"]').fill("1234.5678");
        await page.locator('input[name="yield"]').fill("1.23");
        await page.locator("text=Add asset").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/assets/");

        // 2. from portfolio overview "create another asset", w/o yield
        await page.locator('a:has-text("Add an asset")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/portfolio/assets/create"
        );
        await page
            .locator('[placeholder="Enter an asset name"]')
            .fill("Asset #2");
        await page
            .locator('[placeholder="Enter an asset symbol"]')
            .fill("AST2");
        await page.locator('select[name="category"]').selectOption("Stocks");
        await page.locator('input[name="price"]').fill("2345.6789");
        await page.locator("text=Add asset").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/assets/");

        // Update 2 assets:
        // 1. w/o yield
        await page.locator('a:has-text("Edit")').first().click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/assets\/\w+\/update/
        );
        await page
            .locator('[placeholder="Enter an asset name"]')
            .fill("Asset #1 Edited");
        await page
            .locator('[placeholder="Enter an asset symbol"]')
            .fill("AST1EDT");
        await page
            .locator('select[name="category"]')
            .selectOption("Cryptocurrencies");
        await page.locator('input[name="price"]').fill("9876.5432");
        await page.locator('input[name="yield"]').fill("");
        await page.locator("text=Update asset").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");

        // 2. w/ yield
        // Click a:has-text("Edit") >> nth=1
        await page.locator('a:has-text("Edit")').nth(1).click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/assets\/\w+\/update/
        );
        await page
            .locator('[placeholder="Enter an asset name"]')
            .fill("Asset #2 Edited");
        await page
            .locator('[placeholder="Enter an asset symbol"]')
            .fill("AST2EDT");
        await page.locator('select[name="category"]').selectOption("Options");
        await page.locator('input[name="price"]').fill("8765.4321");
        await page.locator('input[name="yield"]').fill("8.76");
        await page.locator("text=Update asset").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");

        // Delete two assets, sequentially, to check that order of deletion is correct.
        // 1.
        await page.locator('a:has-text("Delete")').first().click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/assets\/\w+\/delete/
        );
        await page.locator("text=Yes, delete records").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");

        // 2.
        await page.locator('a:has-text("Delete")').click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/portfolio\/assets\/\w+\/delete/
        );
        await page.locator("text=Yes, delete records").click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio/");
    });
});
