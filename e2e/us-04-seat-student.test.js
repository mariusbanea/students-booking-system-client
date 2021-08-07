const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const { createStudent } = require("./api");
const { selectOptionByText } = require("./utils");

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
    Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
        console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
    );

describe("US-04 - Seat student - E2E", () => {
    let page;
    let browser;

    beforeAll(async() => {
        await fsPromises.mkdir("./.screenshots", { recursive: true });
        setDefaultOptions({ timeout: 1000 });
        browser = await puppeteer.launch();
    });

    afterAll(async() => {
        await browser.close();
    });

    describe("/courses/new page", () => {
        beforeEach(async() => {
            page = await browser.newPage();
            page.on("console", onPageConsole);
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(`${baseURL}/courses/new`, { waitUntil: "networkidle0" });
        });

        test("filling and submitting form creates a new course", async() => {
            const courseName = `#${Date.now().toString(10)}`;

            await page.type("input[name=course_name]", courseName);
            await page.type("input[name=capacity]", "6");

            await page.screenshot({
                path: ".screenshots/us-04-create-course-submit-before.png",
                fullPage: true,
            });

            await Promise.all([
                page.click("button[type=submit]"),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await page.screenshot({
                path: ".screenshots/us-04-create-course-submit-after.png",
                fullPage: true,
            });

            await expect(page).toMatch(courseName);
        });
        test("omitting course_name and submitting does not create a new course", async() => {
            await page.type("input[name=capacity]", "3");

            await page.screenshot({
                path: ".screenshots/us-04-omit-course-name-before.png",
                fullPage: true,
            });

            await page.click("button[type=submit]");

            await page.screenshot({
                path: ".screenshots/us-04-omit-course-name-after.png",
                fullPage: true,
            });

            expect(page.url()).toContain("/courses/new");
        });
        test("entering a single character course_name and submitting does not create a new course", async() => {
            await page.type("input[name=course_name]", "1");
            await page.type("input[name=capacity]", "6");

            await page.screenshot({
                path: ".screenshots/us-04-short-course-name-before.png",
                fullPage: true,
            });

            await page.click("button[type=submit]");

            await page.screenshot({
                path: ".screenshots/us-04-short-course-name-after.png",
                fullPage: true,
            });

            expect(page.url()).toContain("/courses/new");
        });
        test("omitting capacity and submitting does not create a new course", async() => {
            await page.type("input[name=course_name]", "Omit capacity");

            await page.screenshot({
                path: ".screenshots/us-04-omit-capacity-before.png",
                fullPage: true,
            });

            await page.click("button[type=submit]");

            await page.screenshot({
                path: ".screenshots/us-04-omit-capacity-after.png",
                fullPage: true,
            });

            expect(page.url()).toContain("/courses/new");
        });
        test("canceling form returns to previous page", async() => {
            await page.goto(`${baseURL}/students/new`, {
                waitUntil: "networkidle0",
            });
            await page.goto(`${baseURL}/courses/new`, {
                waitUntil: "networkidle0",
            });

            const [cancelButton] = await page.$x(
                "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'cancel')]"
            );

            if (!cancelButton) {
                throw new Error("button containing cancel not found.");
            }

            await page.screenshot({
                path: ".screenshots/us-04-create-course-cancel-before.png",
                fullPage: true,
            });

            await Promise.all([
                cancelButton.click(),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await page.screenshot({
                path: ".screenshots/us-04-create-course-cancel-after.png",
                fullPage: true,
            });

            expect(page.url()).toContain("/students/new");
        });
    });

    describe("/students/:student_id/seat page", () => {
        let student;

        beforeEach(async() => {
            student = await createStudent({
                first_name: "Seat",
                last_name: Date.now().toString(10),
                mobile_number: "555-1212",
                student_date: "2035-01-03",
                student_time: "13:45",
                people: 4,
            });

            page = await browser.newPage();
            page.on("console", onPageConsole);
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(
                `${baseURL}/students/${student.student_id}/seat`, {
                    waitUntil: "networkidle0",
                }
            );
        });

        test("seating student at course #1 makes the course occupied", async() => {
            await page.waitForSelector('option:not([value=""])');

            await page.screenshot({
                path: ".screenshots/us-04-seat-student-start.png",
                fullPage: true,
            });

            await selectOptionByText(page, "course_id", "#1 - 6");

            await page.screenshot({
                path: ".screenshots/us-04-seat-student-submit-before.png",
                fullPage: true,
            });

            await Promise.all([
                page.click("[type=submit]"),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await page.screenshot({
                path: ".screenshots/us-04-seat-student-submit-after.png",
                fullPage: true,
            });

            expect(page.url()).toContain("/dashboard");
            expect(page).toMatch(/occupied/i);
        });
        test("cannot seat student at Bar #1", () => {});
    });

    describe("/dashboard page", () => {
        let student;

        beforeEach(async() => {
            student = await createStudent({
                first_name: "Seat",
                last_name: Date.now().toString(10),
                mobile_number: "555-1313",
                student_date: "2035-01-01",
                student_time: "13:45",
                people: 4,
            });

            page = await browser.newPage();
            page.on("console", onPageConsole);
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(`${baseURL}/dashboard?date=2035-01-01`, {
                waitUntil: "networkidle0",
            });
        });

        // eslint-disable-next-line no-template-curly-in-string
        test("seat button has href with /students/${student_id}/seat", async() => {
            await page.screenshot({
                path: ".screenshots/us-04-dashboard-seat-button-before.png",
                fullPage: true,
            });

            const hrefSelector = `[href="/students/${student.student_id}/seat"]`;

            await page.waitForSelector(hrefSelector);

            await page.screenshot({
                path: ".screenshots/us-04-dashboard-seat-button-after.png",
                fullPage: true,
            });

            const containsSeat = await page.evaluate((hrefSelector) => {
                return document
                    .querySelector(hrefSelector)
                    .innerText.toLowerCase()
                    .includes("seat");
            }, hrefSelector);

            expect(containsSeat).toBe(true);
        });
    });
});