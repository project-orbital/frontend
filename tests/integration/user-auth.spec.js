const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("user authentication", () => {
    test.beforeEach(async ({ page }) => {
        // Go to the sign-in page.
        await page.goto("http://localhost:3000/");
    });

    test("user cannot sign in with a wrong password", async ({ page }) => {
        // Attempt sign-in.
        await page.locator("text=Sign in").first().click();
        await expect(page).toHaveURL("http://localhost:3000/sign-in");
        await page.fill("text=Username", process.env.TESTING_USERNAME);
        await page.fill("text=Password", "SOME RANDOM INCORRECT PASSWORD");
        await page.locator('button:has-text("Sign in")').click();

        // User should not be signed in.
        await expect(page).toHaveURL("http://localhost:3000/sign-in");

        // User should be notified of the error.
        await expect(
            page.locator("text=Incorrect username/password.").first()
        ).toBeVisible();
    });

    test("user can be redirected to sign up", async ({ page }) => {
        await page.locator("text=Sign in").first().click();
        await expect(page).toHaveURL("http://localhost:3000/sign-in");
        await page.locator('a:has-text("Create an account")').click();
        await expect(page).toHaveURL("http://localhost:3000/sign-up");
    });

    test("user can be redirected to reset password", async ({ page }) => {
        await page.locator("text=Sign in").first().click();
        await expect(page).toHaveURL("http://localhost:3000/sign-in");
        await page.locator("text=Reset password").click();
        await expect(page).toHaveURL(
            "http://localhost:3000/request-password-reset"
        );
    });
});
