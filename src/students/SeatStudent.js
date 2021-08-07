import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listStudents, seatCourse } from "../utils/api";

/**
 * On this page, the user chooses a course to seat a student at.
 */
export default function SeatStudent({ courses, loadDashboard }) {
    const history = useHistory();

    const [course_id, setCourseId] = useState(0);
    const [students, setStudents] = useState([]);
    const [studentsError, setStudentsError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [apiError, setApiError] = useState(null);

    const { student_id } = useParams();

    /**
     * At first render, make an API call to get all students.
     */
    useEffect(() => {
        const abortController = new AbortController();

        setStudentsError(null);

        listStudents(null, abortController.signal)
            .then(setStudents)
            .catch(setStudentsError);

        return () => abortController.abort();
    }, []);

    if (!courses || !students) return null;

    /**
     * Whenever a user makes a change to the form, update the state.
     */
    function handleChange({ target }) {
        setCourseId(target.value);
    }

    /**
     * Whenever a user submits the form, validate and make the API call.
     */
    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();

        if (validateSeat()) {
            seatCourse(student_id, course_id, abortController.signal)
                .then(loadDashboard)
                .then(() => history.push(`/dashboard`))
                .catch(setApiError);
        }

        return () => abortController.abort();
    }

    /**
     * Make sure the student can be seated at a particular course.
     */
    function validateSeat() {
        const foundErrors = [];

        const foundCourse = courses.find((course) => course.course_id === Number(course_id));
        const foundStudent = students.find((student) => student.student_id === Number(student_id));

        if (!foundCourse) {
            foundErrors.push("The course you selected does not exist.");
        }
        else if (!foundStudent) {
            foundErrors.push("This student does not exist.")
        }
        else {
            if (foundCourse.status === "occupied") {
                foundErrors.push("The course you selected is currently occupied.")
            }

            if (foundCourse.capacity < foundStudent.people) {
                foundErrors.push(`The course you selected cannot seat ${foundStudent.people} people.`)
            }
        }

        setErrors(foundErrors);

        return foundErrors.length === 0;
    }

    const courseOptionsJSX = () => {
        return courses.map((course) =>
            <option key={course.course_id} value={course.course_id}>{course.course_name} - {course.capacity}</option>);
    };

    const errorsJSX = () => {
        return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
    };

    return (
        <form className="form-select">
            {errorsJSX()}
            <ErrorAlert error={apiError} />
            <ErrorAlert error={studentsError} />

            <label className="form-label" htmlFor="course_id">Choose course:</label>
            <select
                className="form-control"
                name="course_id"
                id="course_id"
                value={course_id}
                onChange={handleChange}
            >
                <option value={0}>Choose a course</option>
                {courseOptionsJSX()}
            </select>

            <button className="btn btn-primary m-1" type="submit" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-danger m-1" type="button" onClick={history.goBack}>Cancel</button>
        </form>
    );
}