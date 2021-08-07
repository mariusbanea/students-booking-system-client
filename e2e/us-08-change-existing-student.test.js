const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const { createStudent } = require("./api");

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
    Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
        console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
    );

describe("US-08 - Change an existing student - E2E", () => {
    let page;
    let browser;
    let student;

    const dashboardTestPath = `${baseURL}/dashboard?date=2035-01-04`;

    beforeAll(async() => {
        await fsPromises.mkdir("./.screenshots", { recursive: true });
        setDefaultOptions({ timeout: 1000 });
        browser = await puppeteer.launch();
    });

    beforeEach(async() => {
        student = await createStudent({
            first_name: "Change",
            last_name: Date.now().toString(10),
            mobile_number: "555-1616",
            student_date: "2035-01-04",
            student_time: "14:00",
            people: 4,
        });
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        page.on("console", onPageConsole);
    });

    afterAll(async() => {
        await browser.close();
    });

    describe("/dashboard page", () => {
        beforeEach(async() => {
            await page.goto(dashboardTestPath, {
                waitUntil: "networkidle0",
            });
        });

        describe("student edit link", () => {
            test("goes to the /students/:student_id/edit page", async() => {
                await page.screenshot({
                    path: ".screenshots/us-08-dashboard-edit-click-before.png",
                    fullPage: true,
                });

                const hrefSelector = `[href="/students/${student.student_id}/edit"]`;
                await page.waitForSelector(hrefSelector);

                await page.screenshot({
                    path: ".screenshots/us-08-dashboard-edit-click-after-no-change-expected.png",
                    fullPage: true,
                });

                expect(await page.$(hrefSelector)).toBeDefined();
            });
        });
        describe("clicking the student cancel button", () => {
            test("then clicking OK removes the student", async() => {
                await page.screenshot({
                    path: ".screenshots/us-08-cancel-student-before.png",
                    fullPage: true,
                });

                const cancelButtonSelector = `[data-student-id-cancel="${student.student_id}"]`;

                const cancelButton = await page.$(cancelButtonSelector);

                if (!cancelButton) {
                    throw new Error(
                        `Cancel button for student_id ${student.student_id} was not found.`
                    );
                }

                page.on("dialog", async(dialog) => {
                    expect(dialog.message()).toContain(
                        "Do you want to cancel this student?"
                    );
                    await dialog.accept();
                });

                await cancelButton.click();

                await page.waitForResponse((response) => {
                    return response.url().includes("/students?date=");
                });

                await page.waitForTimeout(500);

                expect(await page.$(cancelButtonSelector)).toBeNull();
            });
            test("then clicking cancel makes no changes", async() => {
                await page.screenshot({
                    path: ".screenshots/us-08-dont-cancel-student-before.png",
                    fullPage: true,
                });

                const cancelButtonSelector = `[data-student-id-cancel="${student.student_id}"]`;

                const cancelButton = await page.$(cancelButtonSelector);

                if (!cancelButton) {
                    throw new Error("button containing cancel not found.");
                }

                page.on("dialog", async(dialog) => {
                    await dialog.dismiss();
                });

                await cancelButton.click();

                await page.screenshot({
                    path: ".screenshots/us-08-dont-cancel-student-after.png",
                    fullPage: true,
                });

                expect(await page.$(cancelButtonSelector)).not.toBeNull();
            });
        });
    });

    describe("/students/:student_id/edit page", () => {
        beforeEach(async() => {
            await page.goto(`${baseURL}/dashboard`, {
                waitUntil: "networkidle0",
            });
            await page.goto(
                `${baseURL}/students/${student.student_id}/edit`, {
                    waitUntil: "networkidle0",
                }
            );
        });

        test("canceling form returns to the previous page", async() => {
            const [cancelButton] = await page.$x(
                "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'cancel')]"
            );

            if (!cancelButton) {
                throw new Error("button containing cancel not found.");
            }

            await page.screenshot({
                path: ".screenshots/us-08-edit-student-cancel-before.png",
                fullPage: true,
            });

            await Promise.all([
                cancelButton.click(),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await page.screenshot({
                path: ".screenshots/us-08-edit-student-cancel-after.png",
                fullPage: true,
            });

            expect(page.url()).toContain("/dashboard");
        });

        test("filling and submitting form updates the student", async() => {

            const firstNameInput = await page.$("input[name=first_name]");

            await firstNameInput.click({ clickCount: 3 });

            await firstNameInput.type("John");

            const [submitButton] = await page.$x(
                "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'submit')]"
            );

            if (!submitButton) {
                throw new Error("button containing submit not found.");
            }

            await page.screenshot({
                path: ".screenshots/us-08-edit-student-submit-before.png",
                fullPage: true,
            });

            await Promise.all([
                submitButton.click(),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            expect(page.url()).toContain("/dashboard");

            await page.screenshot({
                path: ".screenshots/us-08-edit-student-submit-after.png",
                fullPage: true,
            });

            await expect(page).toMatch(/John/);
        });
    });
});