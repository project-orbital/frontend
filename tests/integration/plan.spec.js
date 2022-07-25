const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("plan", () => {
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

        // Go to plan
        await page.locator('div:has-text("plan")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/plan");
    });

    test("budget create/read/update/delete process", async ({ page }) => {
        // Feign budget creation by cancellation (shouldn't create it)
        await expect(
            page.locator("text=Welcome to Budget Planner.")
        ).toBeVisible();
        await page.locator('a:has-text("Create a budget")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/plan/create-budget"
        );
        await page.locator("text=Cancel").click();
        await expect(page).toHaveURL("http://localhost:3000/plan");
        await expect(
            page.locator("text=Welcome to Budget Planner.")
        ).toBeVisible();

        // Create the budget for real
        await page.locator('a:has-text("Create a budget")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/plan/create-budget"
        );
        await page.locator('input[name="start_date"]').fill("2022-07-01");
        await page.locator('input[name="end_date"]').fill("2022-09-30");
        await page.locator('input[name="budget"]').fill("1234.56");
        await page.locator("text=Create budget").click();
        await expect(page).toHaveURL("http://localhost:3000/plan/");

        // Read the budget
        await expect(page.locator('p:has-text("SGD 1234.56")')).toBeVisible();
        await expect(page.locator("text=01 July 2022")).toBeVisible();
        await expect(page.locator("text=30 September 2022")).toBeVisible();
        await expect(page.locator("text=3 months")).toBeVisible();

        // Edit the budget amount
        await page.locator('a:has-text("Edit budget")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/plan/update-budget"
        );
        await page.locator('input[name="budget"]').click();
        await page.locator('input[name="budget"]').fill("9876.54");
        await page.locator("text=Update budget").click();
        await expect(page).toHaveURL("http://localhost:3000/plan/");

        // Read to check the budget is updated
        await expect(page.locator('p:has-text("SGD 9876.54")')).toBeVisible();
        await expect(page.locator("text=01 July 2022")).toBeVisible();
        await expect(page.locator("text=30 September 2022")).toBeVisible();
        await expect(page.locator("text=3 months")).toBeVisible();

        // Feign budget deletion by cancellation (shouldn't delete it)
        await page.locator('a:has-text("Delete budget")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/plan/delete-budget"
        );
        await page.locator("text=No, don't delete it").click();
        await expect(page).toHaveURL("http://localhost:3000/plan/");

        // Read to check the budget is not deleted
        await expect(page.locator('p:has-text("SGD 9876.54")')).toBeVisible();
        await expect(page.locator("text=01 July 2022")).toBeVisible();
        await expect(page.locator("text=30 September 2022")).toBeVisible();
        await expect(page.locator("text=3 months")).toBeVisible();

        // Delete the budget for real
        await page.locator('a:has-text("Delete budget")').click();
        await expect(page).toHaveURL(
            "http://localhost:3000/plan/delete-budget"
        );
        await page.locator("text=Yes, delete budget").click();
        await expect(page).toHaveURL("http://localhost:3000/plan/");

        // Read the page to check the budget to be cleared
        await expect(
            page.locator("text=Welcome to Budget Planner.")
        ).toBeVisible();
        await expect(
            page.locator('a:has-text("Create a budget")')
        ).toBeVisible();
    });
});
