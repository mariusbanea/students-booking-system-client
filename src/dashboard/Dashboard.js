import React from "react";
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import StudentRow from "./StudentRow";
import CourseRow from "./CourseRow";

/**
 * Defines the dashboard page.
 */
function Dashboard({ date, students, studentsError, courses, coursesError, loadDashboard }) {
    const history = useHistory();

    const studentsJSX = () => {
        return students.map((student) =>
            <StudentRow key={student.student_id} student={student} loadDashboard={loadDashboard} />);
    };

    const coursesJSX = () => {
        return courses.map((course) =>
            <CourseRow key={course.course_id} course={course} loadDashboard={loadDashboard} />);
    };

    /**
     * Allows the user to go forward/backward days on the calendar.
     */
    function handleClick({ target }) {
        let newDate;
        let useDate;

        if (!date) {
            useDate = today();
        }
        else {
            useDate = date;
        }

        if (target.name === "previous") {
            newDate = previous(useDate);
        }
        else if (target.name === "next") {
            newDate = next(useDate);
        }
        else {
            newDate = today();
        }

        history.push(`/dashboard?date=${newDate}`);
    }

    return (
        <main>
            <h1>Dashboard</h1>

            <h4 className="mb-0">Students for {date}</h4>

            <button className="btn btn-secondary m-1" type="button" name="previous" onClick={handleClick}>Previous</button>
            <button className="btn btn-primary m-1" type="button" name="today" onClick={handleClick}>Today</button>
            <button className="btn btn-secondary m-1" type="button" name="next" onClick={handleClick}>Next</button>

            <ErrorAlert error={studentsError} />

            <table className="table table-hover m-1">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">People</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Cancel</th>
                        <th scope="col">Seat</th>
                    </tr>
                </thead>

                <tbody>
                    {studentsJSX()}
                </tbody>
            </table>

            <br />
            <br />

            <h4 className="mb-0">Courses</h4>

            <ErrorAlert error={coursesError} />

            <table className="table table-hover m-1">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Course ID</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Student ID</th>
                        <th scope="col">Finish</th>
                    </tr>
                </thead>

                <tbody>
                    {coursesJSX()}
                </tbody>
            </table>
        </main>
    );
}

export default Dashboard;
