const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const { containsText } = require("./utils");
const { createStudent, createCourse, seatStudent } = require("./api");

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
    Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
        console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
    );

describe("US-06 - Student status - E2E", () => {
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

    describe("/dashboard page", () => {
        let student;
        let course;

        beforeEach(async() => {
            student = await createStudent({
                first_name: "Status",
                last_name: Date.now().toString(10),
                mobile_number: "555-1313",
                student_date: "2035-01-01",
                student_time: "13:45",
                people: 4,
            });

            course = await createCourse({
                course_name: `#${Date.now().toString(10)}`,
                capacity: 99,
            });

            page = await browser.newPage();
            page.on("console", onPageConsole);
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(`${baseURL}/dashboard?date=2035-01-01`, {
                waitUntil: "networkidle0",
            });
            await page.reload({ waitUntil: "networkidle0" });
        });

        test("/dashboard displays status", async() => {
            await page.screenshot({
                path: ".screenshots/us-06-dashboard-displays-status.png",
                fullPage: true,
            });

            const containsBooked = await containsText(
                page,
                `[data-student-id-status="${student.student_id}"]`,
                "booked"
            );

            expect(containsBooked).toBe(true);
        });

        test("Seating the student changes status to 'seated' and hides Seat button", async() => {
            await page.screenshot({
                path: ".screenshots/us-06-seated-before.png",
                fullPage: true,
            });

            await seatStudent(student.student_id, course.course_id);

            await page.reload({ waitUntil: "networkidle0" });

            await page.screenshot({
                path: ".screenshots/us-06-seated-after.png",
                fullPage: true,
            });

            const containsSeated = await containsText(
                page,
                `[data-student-id-status="${student.student_id}"]`,
                "seated"
            );

            expect(containsSeated).toBe(true);
            expect(
                await page.$(
                    `[href="/students/${student.student_id}/seat"]`
                )
            ).toBeNull();
        });

        test("Finishing the course removes the student from the list", async() => {
            await seatStudent(student.student_id, course.course_id);

            await page.reload({ waitUntil: "networkidle0" });

            await page.screenshot({
                path: ".screenshots/us-06-finish-before.png",
                fullPage: true,
            });

            const finishButtonSelector = `[data-course-id-finish="${course.course_id}"]`;
            await page.waitForSelector(finishButtonSelector);

            page.on("dialog", async(dialog) => {
                await dialog.accept();
            });

            await page.click(finishButtonSelector);

            await page.waitForResponse((response) => {
                return response.url().endsWith(`/courses`);
            });

            await page.screenshot({
                path: ".screenshots/us-06-finish-after.png",
                fullPage: true,
            });

            expect(
                await page.$(
                    `[data-student-id-status="${student.student_id}"]`
                )
            ).toBeNull();
        });
    });
});