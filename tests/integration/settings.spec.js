const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("accounts", () => {
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
    });

    test("data erasure process", async ({ page }) => {
        // Initiate data erasure.
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

        // Check dashboard.
        await page.locator('div:has-text("dashboard")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/dashboard");
        await expect(
            page.locator('text="You haven\'t created an account yet."')
        ).toBeVisible();

        // Check accounts.
        await page.locator('div:has-text("accounts")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/accounts");
        await expect(
            page.locator('text="You haven\'t created an account yet."')
        ).toBeVisible();

        // Check portfolio.
        await page.locator('div:has-text("portfolio")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/portfolio");
        await expect(
            page.locator(
                'text="You haven\'t added any assets or liabilities yet."'
            )
        ).toBeVisible();

        // Check plan.
        await page.locator('div:has-text("plan")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/plan");
        await expect(
            page.locator('text="Welcome to Budget Planner."')
        ).toBeVisible();
    });

    test("dark mode toggle", async ({ page }) => {
        expect(page.locator('button:has-text("dark mode")')).toBeVisible();
        if (await page.isVisible("text='Enable dark mode'")) {
            await page.locator('button:has-text("Enable dark mode")').click();
            await page.reload();
            await page.locator('button:has-text("Disable dark mode")').click();
            await page.reload();
        } else {
            await page.locator('button:has-text("Disable dark mode")').click();
            await page.reload();
            await page.locator('button:has-text("Enable dark mode")').click();
            await page.reload();
        }
    });

    test("password change process", async ({ page }) => {
        await page.locator('a:has-text("Change password")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/settings/change-password"
        );

        // Expect password change to be rejected when an incorrect password is given.
        await page
            .locator('input[name="currentPassword"]')
            .fill("SOME_INCORRECT_PASSWORD");
        await page.locator('button:has-text("Change password")').click();
        await page
            .locator('input[name="password"]')
            .fill(process.env.TESTING_PASSWORD);
        await page
            .locator('input[name="confirmPassword"]')
            .fill(process.env.TESTING_PASSWORD);
        await page.locator('button:has-text("Change password")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/settings/change-password"
        );
        await expect(
            page.locator('text="Current password is incorrect."')
        ).toHaveCount(2); // toast and input error message

        // Expect password change to fail when new password is shorter than 8 characters.
        await page
            .locator('input[name="currentPassword"]')
            .fill(process.env.TESTING_PASSWORD);
        await page.locator('input[name="password"]').fill("1234567");
        await page.locator('input[name="confirmPassword"]').fill("1234567");
        await page.locator('button:has-text("Change password")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/settings/change-password"
        );
        await expect(
            page.locator('text="Password must be at least 8 characters long."')
        ).toBeVisible();

        // Expect password change to fail if new and confirm passwords do not match.
        await page
            .locator('input[name="currentPassword"]')
            .fill(process.env.TESTING_PASSWORD);
        await page.locator('input[name="password"]').fill("1234567");
        await page
            .locator('input[name="confirmPassword"]')
            .fill(process.env.TESTING_PASSWORD);
        await page.locator('button:has-text("Change password")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/settings/change-password"
        );
        await expect(
            page.locator('text="Passwords must match."')
        ).toBeVisible();

        // Expect password change to succeed otherwise.
        await page
            .locator('input[name="currentPassword"]')
            .fill(process.env.TESTING_PASSWORD);
        await page
            .locator('input[name="password"]')
            .fill(process.env.TESTING_PASSWORD);
        await page
            .locator('input[name="confirmPassword"]')
            .fill(process.env.TESTING_PASSWORD);
        await page.locator('button:has-text("Change password")').click();
        await expect(
            page.locator('text="Password changed successfully."')
        ).toBeVisible();
        await expect(page).toHaveURL("http://localhost:3000/settings/");

        // Test signing in again with the new password.
        await page.locator('div:has-text("sign out")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/");
        await page.locator('a:has-text("Sign in")').first().click();
        await expect(page).toHaveURL("http://localhost:3000/sign-in");
        await page.fill("text=Username", process.env.TESTING_USERNAME);
        await page.fill("text=Password", process.env.TESTING_PASSWORD);
        await page.locator('button:has-text("Sign in")').click();
        await expect(page).toHaveURL("http://localhost:3000/dashboard");
    });
});
