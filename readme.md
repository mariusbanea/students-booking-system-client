# Student Mentoring System

> The software is used only by restaurant personnel when a customer calls to request a student.
> At this point, the customers will not access the system online.

There are no user stories for deployment: it is expected that you will deploy the application to production after you finish a user story.

There are no user stories for logging: it is expected that you will add logging to the application with enough detail to help you diagnose issues in production.

## Existing files

As you work through the user stories listed later in this document, you will be writing code that allows your frontend and backend applications to talk to each other. You will also write code to allow your controllers and services to connect to, and query, your PostgreSQL database via [Knex](http://knexjs.org/).

The table below describes the folders in this starter repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./students-booking-system-server`     | The backend project, which runs on `localhost:5000` by default.  |
| `./students-booking-system-client`    | The frontend project, which runs on `localhost:3000` by default. |

This starter code closely follows the best practices and patterns established in the Robust Server Structure module.

**Note**: Please do not submit a pull request to this repository with your solution.

### Backend Existing files

The `./students-booking-system-server` folder contains all the code for the backend project.

The table below describes the existing files in the `./students-booking-system-server` folder:

| Folder/file path                                         | Description                                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `./students-booking-system-server/knexfile.js`                                 | The Knex configuration file. You will not need to make changes to this file.                                        |
| `./students-booking-system-server/src/app.js`                                  | Defines the Express application and connects routers.                                                               |
| `./students-booking-system-server/src/db/connection.js`                        | The Knex connection file. You will not need to make changes to this file.                                           |
| `./students-booking-system-server/src/db/migrations`                           | The Knex migrations folder.                                                                                         |
| `./students-booking-system-server/src/db/seeds/`                               | The Knex seeds folder.                                                                                              |
| `./students-booking-system-server/src/errors/errorHandler.js`                  | Defined an Express API error handler.                                                                               |
| `./students-booking-system-server/src/errors/notFound.js`                      | Defined an Express API "not found" handler.                                                                         |
| `./students-booking-system-server/src/students/students.controller.js` | A controller for the students resource.                                                                         |
| `./students-booking-system-server/src/students/students.router.js`     | A router for the students resource.                                                                             |
| `./students-booking-system-server/src/server.js`                               | Defines the node server.                                                                                            |
| `./students-booking-system-server/test`                                        | A folder that contains all of the integration tests. You will not need to make changes to the files in this folder. |
| `./students-booking-system-server/vercel.json`                                 | A vercel deployment configuration file. You will not need to make changes to this file.                             |

### Frontend Existing files

The `./students-booking-system-client` folder contains all the code for the frontend project.

The table below describes the existing files in the `./students-booking-system-client` folder:

| Folder/file path                                   | Description                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `./students-booking-system-client/e2e`                                  | Contains all of the end-to-end tests. You will not need to make changes to the files in this folder.   |
| `./students-booking-system-client/jest-puppeteer.config.js`             | A configuration file used by the end-to-end tests. You will not need to make changes to this file.     |
| `./students-booking-system-client/src/App.js`                           | Defines the root application component. You will not need to make changes to this file.                |
| `./students-booking-system-client/src/App.test.js`                      | Contains the tests for the root application component. You will not need to make changes to this file. |
| `./students-booking-system-client/src/dashboard/Dashboard.js`           | Defines the Dashboard page.                                                                            |
| `./students-booking-system-client/src/index.js`                         | The main entry point for the React application.                                                        |
| `./students-booking-system-client/src/layout/ErrorAlert.js`             | Defines an error alert component that display only when an error is specified.                         |
| `./students-booking-system-client/src/layout/Layout.css`                | The css for the Layout component.                                                                      |
| `./students-booking-system-client/src/layout/Layout.js`                 | Defines the main layout of the application.                                                            |
| `./students-booking-system-client/src/layout/Menu.js`                   | Defines the menu for the application.                                                                  |
| `./students-booking-system-client/src/layout/NotFound.js`               | Defines the "Not found" component that is displayed when no route matches.                             |
| `./students-booking-system-client/src/layout/Routes.js`                 | Defines all the routes for the application.                                                            |
| `./students-booking-system-client/src/utils/api.js`                     | Defines the functions used to access the backend API                                                   |
| `./students-booking-system-client/src/utils/date-time.js`               | Defines functions to format date and time strings.                                                     |
| `./students-booking-system-client/src/utils/format-student-date.js` | Defines a function to format the date on a single student or an array of students.             |
| `./students-booking-system-client/src/utils/format-student-time.js` | Defines a function to format the time on a single student or an array of students.             |
| `./students-booking-system-client/src/utils/useQuery.js`                | Defines a custom hook to parse the query parameters from the URL.                                      |

## Database setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

### Knex

Run `npx knex` commands from within the `students-booking-system-server` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./students-booking-system-server/.env.sample ./students-booking-system-server/.env`.
1. Update the `./students-booking-system-server/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./students-booking-system-client/.env.sample ./students-booking-system-client/.env`.
1. You should not need to make changes to the `./students-booking-system-client/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests for the user story you're working on at any given time.

Once you have all user stories complete, you can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.

> **Note**: After running `npm test`, `npm run test:X`, or `npm run test:e2e` you might see something like the following in the output: `[start:frontend] Assertion failed:`. This is not a failure, it is just the frontend project getting shutdown automatically.

> **Note**: If you are getting a `unable to resolve dependency tree` error when running the frontend tests, run the following command: `npm install --force --prefix students-booking-system-client`. This will allow you to run the frontend tests.

> **Hint**: If you stop the tests before they finish, it can leave the test database in an unusual state causing the tests to fail unexpectedly the next time you run them. If this happens, delete all tables in the test database, including the `knex_*` tables, and try the tests again.

### Frontend test timeout failure

Running the frontend tests on a resource constrained computer may result in timeout failures.

If you believe your implementation is correct, but needs a bit more time to finish, you can update the `testTimeout` value in `students-booking-system-client/e2e/jest.config.js`. A value of 10000 or even 12000 will give each test a few more seconds to complete.

#### Screenshots

To help you better understand what might be happening during the end-to-end tests, screenshots are taken at various points in the test.

The screenshots are saved in `students-booking-system-client/.screenshots` and you can review them after running the end-to-end tests.

You can use the screenshots to debug your code by rendering additional information on the screen.

## Product Backlog

Each of the user stories is listed below, and your Product Manager wants them to be implemented in the order in which they are listed. Another developer has already written the tests for each of the user stories so that you don't have to.

Although the user stories do not say anything about deployment, you should consider deploying early and often. You may even decide to deploy before adding any features. Since this is a monorepo, you can follow the instructions in [this Vercel article on monorepos](https://vercel.com/blog/monorepos) to deploy this project.

### US-01 Create and list students

As a restaurant manager<br/>
I want to create a new student when a customer calls<br/>
so that I know how many customers will arrive at the restaurant on a given day.

#### Acceptance Criteria

1. The `/students/new` page will
   - have the following required and not-nullable fields:
     - First name: `<input name="first_name" />`
     - Last name: `<input name="last_name" />`
     - Mobile number: `<input name="mobile_number" />`
     - Date of student: `<input name="student_date" />`
     - Time of student: `<input name="student_time" />`
     - Number of people in the party, which must be at least 1 person. `<input name="people" />`
   - display a `Submit` button that, when clicked, saves the new student, then displays the `/dashboard` page for the date of the new student
   - display a `Cancel` button that, when clicked, returns the user to the previous page
   - display any error messages returned from the API
1. The `/dashboard` page will
   - list all students for one date only. (E.g. if the URL is `/dashboard?date=2035-12-30` then send a GET to `/students?date=2035-12-30` to list the students for that date). The date is defaulted to today, and the students are sorted by time.
   - display next, previous, and today buttons that allow the user to see students on other dates
   - display any error messages returned from the API
1. The `/students` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.
   - seed the students table with the data contained in `./students-booking-system-server/src/db/seeds/00-students.json`

> **Hint** Dates and times in JavaScript and databases can be challenging.
>
> The users have confirmed that they will be using Chrome to access the site. This means you can use `<input type="date" />` and `<input type="time" />`, which are supported by Chrome but may not work in other browsers.
>
> `<input type="date" />` will store the date in `YYYY-MM-DD` format. This is a format that works well with the PostgreSQL `date` data type.
>
> `<input type="time" />` will store the time in `HH:MM:SS` format. This is a format that works well with the PostgreSQL `time` data type.
>
> **Optional** If you want to add support to other browsers such as Safari or IE, you can use the pattern and placeholder attributes along with the date and time inputs in your form. For the date input you can use `<input type="date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}"/>`, and for the time input you can use `<input type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}"/>`. You can read more about handling browser support [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#handling_browser_support).
>
> You can assume that all dates and times will be in your local time zone.

> **Hint** In the backend code, be sure to wrap any async controller functions in an `asyncErrorBoundary` call to ensure errors in async code are property handled.

In `students-booking-system-server/src/errors/asyncErrorBoundary.js`

```javascript
function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;
```

Use in controllers as part of `module.exports`. For example:

```javascript
module.exports = {
	create: asyncErrorBoundary(create)
}
```

### US-02 Create student on a future, working date

As a restaurant manager<br/>
I only want to allow students to be created on a day when we are open<br/>
so that users do not accidentally create a student for days when we are closed.<br/>

#### Acceptance criteria

1. The `/students/new` page will display an error message with `className="alert alert-danger"` if any of the following constraints are violated:
   - The student date is a Tuesday as the restaurant is closed on Tuesdays.
   - The student date is in the past. Only future students are allowed.
1. The `/students` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

> **Hint** There may be more than one validation error on the page at time.
>
> For example, a student in the past on a Tuesday violates both rules, so the page should display two errors within a single `className="alert alert-danger"`
>
> However, the API validation does not need to include multiple validation error messages.
> You can run the validation in any order and report only one validation error at a time, and the tests will pass.
>
> Also, parsing a date in YYYY-MM-DD format using the built-in Date class assumes the date is a UTC date. UTC is a time standard that is the basis for civil time and time zones worldwide, but it is NOT a timezone. As a result, keep an eye out for how your dates are interpreted by the Date class.
>
> While there is nothing preventing you from using a third party library to handle dates for your project, you are encouraged to use the built-in Date class.

### US-03 Create student within eligible timeframe

As a restaurant manager<br/>
I only want to allow students to be created during business hours, up to 60 minutes before closing<br/>
so that users do not accidentally create a student for a time we cannot accommodate.

#### Acceptance criteria

1. The `/students/new` page will display an error message with `className="alert alert-danger"`, if any of the following additional constraints are violated:
   - The student time is before 10:30 AM.
   - The student time is after 9:30 PM, because the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.
   - The student date and time combination is in the past. Only future students are allowed. E.g., if it is noon, only allow students starting _after_ noon today.
1. The `/students` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

> **Hint** Parsing a Date that includes the time in JavaScript can be tricky. Again, keep an eye out for which time zone is being used for your Dates.

### US-04 Seat student

As a restaurant manager, <br/>
When a customer with an existing student arrives at the restaurant<br/>
I want to seat (assign) their student to a specific course<br/>
so that I know which courses are occupied and free.

#### Acceptance Criteria

1. The `/courses/new` page will
   - have the following required and not-nullable fields:
     - Table name: `<input name="table_name" />`, which must be at least 2 characters long.
     - Capacity: `<input name="capacity" />`, this is the number of people that can be seated at the course, which must be at least 1 person.
   - display a `Submit` button that, when clicked, saves the new course then displays the `/dashboard` page
   - display a `Cancel` button that, when clicked, returns the user to the previous page
1. The `/dashboard` page will:

   - display a list of all students in one area.
   - each student in the list will:
     - Display a "Seat" button on each student.
     - The "Seat" button must be a link with an `href` attribute that equals `/students/${student_id}/seat`, so it can be found by the tests.
   - display a list of all courses, sorted by `course_name`, in another area of the dashboard
     - Each course will display "Free" or "Occupied" depending on whether a student is seated at the course.
     - The "Free" or "Occupied" text must have a `data-table-id-status=${course.course_id}` attribute, so it can be found by the tests.
   - The areas for displaying students and courses can be arranged any way you like; left and right or top and bottom, etc.

1. The `/students/:student_id/seat` page will
   - have the following required and not-nullable fields:
     - Course number: `<select name="course_id" />`. The text of each option must be `{course.course_name} - {course.capacity}` so the tests can find the options.
   - do not seat a student with more people than the capacity of the course
   - display a `Submit` button that, when clicked, assigns the course to the student then displays the `/dashboard` page
   - PUT to `/courses/:course_id/seat/` in order to save the course assignment. The body of the request must be `{ data: { student_id: x } }` where X is the student_id of the student being seated. The tests do not check the body returned by this request.
   - display a `Cancel` button that, when clicked, returns the user to the previous page
1. The `courses` table must be seeded with the following data:
   - `Bar #1` & `Bar #2`, each with a capacity of 1.
   - `#1` & `#2`, each with a capacity of 6.
1. The `/courses` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

- if the course capacity is less than the number of people in the student, return 400 with an error message.
- if the course is occupied, return 400 with an error message.

> **Hint** Work through the acceptance criteria in the order listed, step-by-step. A different order may be more challenging.

> **Hint** Seed the `courses` table in a similar way as it's done with the `students` table.

> **Hint** Add a `student_id` column in the `courses` table. Use the `.references()` and `inTable()` knex functions to add the foreign key reference.

### US-05 Finish an occupied course

As a restaurant manager<br/>
I want to free up an occupied course when the guests leave<br/>
so that I can seat new guests at that course.<br/>

#### Acceptance Criteria

1. The `/dashboard` page will
   - Display a "Finish" button on each _occupied_ course.
   - the "Finish" button must have a `data-table-id-finish={course.course_id}` attribute, so it can be found by the tests.
   - Clicking the "Finish" button will display the following confirmation: "Is this course ready to seat new guests? This cannot be undone." If the user selects "Ok" the system will: - Send a `DELETE` request to `/courses/:course_id/seat` in order to remove the course assignment. The tests do not check the body returned by this request. - The server should return 400 if the course is not occupied. - Refresh the list of courses to show that the course is now available.
   - Clicking the "Cancel" makes no changes.

> **Hint** The end-to-end test waits for the courses list to be refreshed before checking the free/occupied status of the course, so be sure to send a GET request to `/courses` to refresh the courses list.

### US-06 Reservation Status

As a restaurant manager<br/>
I want a student to have a status of either booked, seated, or finished<br/>
so that I can see which student parties are seated, and finished students are hidden from the dashboard.

#### Acceptance Criteria

1. The `/dashboard` page will
   - display the status of the student. The default status is "booked"
     - the status text must have a `data-student-id-status={student.student_id}` attribute, so it can be found by the tests.
   - display the Seat button only when the student status is "booked".
   - clicking the Seat button changes the status to "seated" and hides the Seat button.
   - clicking the Finish button associated with the course changes the student status to "finished" and removes the student from the dashboard.
   - to set the status, PUT to `/students/:student_id/status` with a body of `{data: { status: "<new-status>" } }` where `<new-status>` is one of booked, seated, or finished

> **Hint** You can add a field to a course in a migration `up` method by defining a new column. E.g. `table.string("last_name", null).notNullable();` will create a new last_name column.  Be sure to remove the column in the `down` function using `dropColumn()`. E.g. `table.dropColumn("last_name");`

> **Hint** Use [`Knex.transaction()`](http://knexjs.org/#Transactions) to make sure the `courses` and `students` records are always in sync with each other.

### US-07 Search for a student by phone number

As a restaurant manager<br/>
I want to search for a student by phone number (partial or complete)<br/>
so that I can quickly access a customer's student when they call about their student.<br/>

#### Acceptance Criteria

1. The `/search` page will
   - Display a search box `<input name="mobile_number" />` that displays the placeholder text: "Enter a customer's phone number"
   - Display a "Find" button next to the search box.
   - Clicking on the "Find" button will submit a request to the server (e.g. GET `/students?mobile_phone=555-1212`).
     - then the system will look for the student(s) in the database and display all matched records on the `/search` page using the same students list component as the `/dashboard` page.
     - the search page will display all students matching the phone number, regardless of status.
   - display `No students found` if there are no records found after clicking the Find button.

> **Hint** To search for a partial or complete phone number, you should ignore all formatting and search only for the digits.
> You will need to remove any non-numeric characters from the submitted mobile number and also use the PostgreSQL translate function.
>
> The following function will perform the correct search.
>
> ```javascript
> function search(mobile_number) {
>   return knex("students")
>     .whereRaw(
>       "translate(mobile_number, '() -', '') like ?",
>       `%${mobile_number.replace(/\D/g, "")}%`
>     )
>     .orderBy("student_date");
> }
> ```

### US-08 Change an existing student

As a restaurant manager<br/>
I want to be able to modify a student if a customer calls to change or cancel their student<br/>
so that students are accurate and current.

#### Acceptance Criteria

1. The `/dashboard` and the `/search` page will
   - Display an "Edit" button next to each student
     - Clicking the "Edit" button will navigate the user to the `/students/:student_id/edit` page
   - the "Edit" button must be a link with an `href` attribute that equals `/students/${student_id}/edit`, so it can be found by the tests.
   - Display a "Cancel" button next to each student
   - The Cancel button must have a `data-student-id-cancel={student.student_id}` attribute, so it can be found by the tests.
   - Clicking the "Cancel" button will display the following confirmation: "Do you want to cancel this student? This cannot be undone."
     - Clicking "Ok" on the confirmation dialog, sets the student status to `cancelled`, and the results on the page are refreshed.
       - set the status of the student to `cancelled` using a PUT to `/students/:student_id/status` with a body of `{data: { status: "cancelled" } }`.
     - Clicking "Cancel" on the confirmation dialog makes no changes.
1. The `/students/:student_id/edit` page will display the student form with the existing student data filled in
   - Only students with a status of "booked" can be edited.
   - Clicking the "Submit" button will save the student, then displays the previous page.
   - Clicking "Cancel" makes no changes, then display the previous page.

> **Hint** The same validation used for create applies to editing a student. The form and the API for updating a student must not allow the user to violate any of the rules specified when creating a student.