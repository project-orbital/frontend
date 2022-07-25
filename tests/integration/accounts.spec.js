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

        // Go to dashboard
        await page.locator('div:has-text("dashboard")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/dashboard");
    });

    test("account create/read/update/delete process", async ({ page }) => {
        // Create 3 accounts:
        // 1. w/ name and nickname - created from dashboard onboarding
        await page.locator('a:has-text("Create an account")').click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/create");
        await page
            .locator('[placeholder="Enter an account name"]')
            .fill("Testing Account #1");
        await page
            .locator('[placeholder="Enter an account nickname"]')
            .fill("Nickname #1");
        await page.locator("text=Create account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/");

        // 2. w/ name and nickname - created from accounts page
        await page.locator('a:has-text("Create another account")').click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/create");
        await page
            .locator('[placeholder="Enter an account name"]')
            .fill("Testing Account #2");
        await page
            .locator('[placeholder="Enter an account nickname"]')
            .fill("Nickname #2");
        await page.locator("text=Create account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/");

        // 3. w/ name only, w/o nickname - created from accounts page
        await page.locator('a:has-text("Create another account")').click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/create");
        await page
            .locator('[placeholder="Enter an account name"]')
            .fill("Testing Account #3");
        await page
            .locator('[placeholder="Enter an account nickname"]')
            .fill("");
        await page.locator("text=Create account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/");

        // Read all 3 accounts:
        // Ensure their names and nicknames are displayed.
        await expect(page.locator('text="Testing Account #1"')).toBeVisible();
        await expect(page.locator('text="Nickname #1"')).toBeVisible();
        await expect(page.locator('text="Testing Account #2"')).toBeVisible();
        await expect(page.locator('text="Nickname #2"')).toBeVisible();
        await expect(page.locator('text="Testing Account #3"')).toBeVisible();

        // Rename accounts:
        // 1. w/ new name and nickname
        await page
            .locator("text=Testing Account #1Nickname #1EditDelete >> a")
            .first()
            .click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/accounts\/update\/\w+/
        );
        await page
            .locator('[placeholder="Enter an account name"]')
            .fill("Testing Account Edited #1");
        await page
            .locator('[placeholder="Enter an account nickname"]')
            .fill("Nickname Edited #1");
        await page.locator("text=Rename account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/");

        // 2. w/ new name but w/o nickname
        await page
            .locator("text=Testing Account #2Nickname #2EditDelete >> a")
            .first()
            .click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/accounts\/update\/\w+/
        );
        await page
            .locator('[placeholder="Enter an account name"]')
            .fill("Testing Account Edited #2");
        await page
            .locator('[placeholder="Enter an account nickname"]')
            .fill("");
        await page.locator("text=Rename account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/");

        // 3. w/ new name and w/ nickname
        await page
            .locator("text=Testing Account #3EditDelete >> a")
            .first()
            .click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/accounts\/update\/\w+/
        );
        await page
            .locator('[placeholder="Enter an account name"]')
            .fill("Testing Account Edited #3");
        await page
            .locator('[placeholder="Enter an account nickname"]')
            .fill("Nickname #3");
        await page.locator("text=Rename account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts/");

        // Read all 3 accounts:
        // Ensure their edited names and nicknames are displayed.
        await expect(
            page.locator('text="Testing Account Edited #1"')
        ).toBeVisible();
        await expect(page.locator('text="Nickname Edited #1"')).toBeVisible();
        await expect(
            page.locator('text="Testing Account Edited #2"')
        ).toBeVisible();
        await expect(
            page.locator('text="Testing Account Edited #3"')
        ).toBeVisible();
        await expect(page.locator('text="Nickname #3"')).toBeVisible();

        // Delete all 3 accounts:
        await page
            .locator(
                "text=Testing Account Edited #1Nickname Edited #1EditDelete >> a"
            )
            .nth(1)
            .click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/accounts\/delete\/\w+/
        );
        await page.locator("text=Delete account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts");
        await page
            .locator("text=Testing Account Edited #2EditDelete >> a")
            .nth(1)
            .click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/accounts\/delete\/\w+/
        );
        await page.locator("text=Delete account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts");
        await page
            .locator("text=Testing Account Edited #3Nickname #3EditDelete >> a")
            .nth(1)
            .click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/accounts\/delete\/\w+/
        );
        await page.locator("text=Delete account").click();
        await expect(page).toHaveURL("http://localhost:3000/accounts");

        // Read the page and expect to not see any accounts left.
        await expect(
            page.locator('text="You haven\'t created an account yet."')
        ).toBeVisible();
        await expect(page.locator('text="Create an account"')).toBeVisible();
    });
});
