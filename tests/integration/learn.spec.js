const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("learn", () => {
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

        // Go to learn
        await page.locator('div:has-text("learn")').nth(3).click();
        await expect(page).toHaveURL("http://localhost:3000/learn");
    });

    test("read curated resources", async ({ page }) => {
        // Budgeting tab
        await page.locator('button[role="tab"]:has-text("Budgeting")').click();
        const [page1] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("For college students6 important tips on how to manage money for college students")'
                )
                .click(),
        ]);
        page1.close();
        const [page2] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("For young adults8 essential budgeting tips on how to spend less and save more.")'
                )
                .click(),
        ]);
        page2.close();
        const [page3] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("For working adultsLearn more about the 50/30/20 Budgeting Rule to allocate your ")'
                )
                .click(),
        ]);
        page3.close();
        const [page4] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("For parentsStart early and teach your children the smart money habits.")'
                )
                .click(),
        ]);
        page4.close();

        // Investment tab
        await page.locator("text=Investment").click();
        const [page5] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("For newbiesIt\'s important to know you what you are doing even before you get sta")'
                )
                .click(),
        ]);
        page5.close();
        const [page6] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("From Warren BuffettLet\'s hear from one of the most successful investors in the w")'
                )
                .click(),
        ]);
        page6.close();
        const [page7] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("Long term investingFor the majority of us, we should think about long term when ")'
                )
                .click(),
        ]);
        page7.close();
    });

    test("community contribution create/read/update/delete process", async ({
        page,
    }) => {
        // Go to community contributions tab
        await page.locator("text=Community Contributions").click();

        // Feign contribution creation by cancellation (shouldn't create it)
        await page.locator('a:has-text("Contribute an article")').click();
        await expect(page).toHaveURL("http://localhost:3000/learn/contribute");
        await page.locator("text=Cancel").click();
        await expect(page).toHaveURL("http://localhost:3000/learn");

        // Create a contribution for real
        await page.locator('a:has-text("Contribute an article")').click();
        await expect(page).toHaveURL("http://localhost:3000/learn/contribute");
        await page.locator('[name="header"]').fill("Test Contribution");
        await page
            .locator('textarea[name="summary"]')
            .fill("Test contribution summary.");
        await page.locator('[name="link"]').fill("google.com");
        await page.locator("text=Contribute article").click();
        await expect(page).toHaveURL("http://localhost:3000/learn/");

        // Test contribution link
        const [contributionPage] = await Promise.all([
            page.waitForEvent("popup"),
            page
                .locator(
                    'a:has-text("Test ContributionTest contribution summary")'
                )
                .click(),
        ]);
        contributionPage.close();

        // Feign report by cancellation (shouldn't report it)
        await page.locator('a:has-text("Report")').nth(3).click();
        await expect(page).toHaveURL(
            /http:\/\/localhost:3000\/learn\/report\/\w+/
        );
        await page.locator("text=Cancel").click();
        await expect(page).toHaveURL("http://localhost:3000/learn/");

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
    });
});
