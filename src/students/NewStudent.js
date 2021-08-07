import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createStudent, editStudent, listStudents } from "../utils/api";

export default function NewStudent({ loadDashboard, edit }) {
    const history = useHistory();
    const { student_id } = useParams();

    const [studentsError, setStudentsError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [formData, setFormData] = useState({
        // initial (default) data
        first_name: "",
        last_name: "",
        mobile_number: "",
        student_date: "",
        student_time: "",
        people: "",
    });

    /**
     * Make an API call to get all students if we are editing, filling in the form.
     */
    useEffect(() => {
        if (edit) {
            if (!student_id) return null;

            loadStudents()
                .then((response) => response.find((student) =>
                    student.student_id === Number(student_id)))
                .then(fillFields);
        }

        function fillFields(foundStudent) {
            if (!foundStudent || foundStudent.status !== "booked") {
                return <p>Only booked students can be edited.</p>;
            }

            const date = new Date(foundStudent.student_date);
            const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate())).slice(-2)}`;

            setFormData({
                first_name: foundStudent.first_name,
                last_name: foundStudent.last_name,
                mobile_number: foundStudent.mobile_number,
                student_date: dateString,
                student_time: foundStudent.student_time,
                people: foundStudent.people,
            });
        }

        async function loadStudents() {
            const abortController = new AbortController();
            return await listStudents(null, abortController.signal)
                .catch(setStudentsError);
        }
    }, [edit, student_id]);

    /**
     * Whenever a user makes a change to the form, update the state.
     */
    function handleChange({ target }) {
        setFormData({ ...formData, [target.name]: target.name === "people" ? Number(target.value) : target.value });
    }

    /**
     * Whenever a user submits the form, validate and make the API call.
     */
    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();

        const foundErrors = [];
        console.log(edit);
        if (validateFields(foundErrors) && validateDate(foundErrors)) {
            if (edit) {
                editStudent(student_id, formData, abortController.signal)
                    .then(loadDashboard)
                    .then(() => history.push(`/dashboard?date=${formData.student_date}`))
                    .catch(setApiError);
            }
            else {
                createStudent(formData, abortController.signal)
                    .then(loadDashboard)
                    .then(() => history.push(`/dashboard?date=${formData.student_date}`))
                    .catch(setApiError);
            }
        }

        setErrors(foundErrors);

        return () => abortController.abort();
    }

    /**
     * Make sure all fields exist and are filled in correctly.
     */
    function validateFields(foundErrors) {
        for (const field in formData) {
            if (formData[field] === "") {
                foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.` })
            }
        }

        return foundErrors.length === 0;
    }

    /**
     * Make sure the date and time of the student works with the restaurant's schedule.
     */
    function validateDate(foundErrors) {
        const reserveDate = new Date(`${formData.student_date}T${formData.student_time}:00.000`);
        const todaysDate = new Date();

        if (reserveDate.getDay() === 2) {
            foundErrors.push({ message: "Student cannot be made: Restaurant is closed on Tuesdays." });
        }

        if (reserveDate < todaysDate) {
            foundErrors.push({ message: "Student cannot be made: Date is in the past." });
        }

        if (reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
            foundErrors.push({ message: "Student cannot be made: Restaurant is not open until 10:30AM." });
        }
        else if (reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
            foundErrors.push({ message: "Student cannot be made: Restaurant is closed after 10:30PM." });
        }
        else if (reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
            foundErrors.push({ message: "Student cannot be made: Student must be made at least an hour before closing (10:30PM)." })
        }

        return foundErrors.length === 0;
    }

    const errorsJSX = () => {
        return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
    };

    return (
        <form>
            {errorsJSX()}
            <ErrorAlert error={apiError} />
            <ErrorAlert error={studentsError} />

            <label className="form-label" htmlFor="first_name">First Name:&nbsp;</label>
            <input
                className="form-control"
                name="first_name"
                id="first_name"
                type="text"
                onChange={handleChange}
                value={formData.first_name}
                required
            />

            <label className="form-label" htmlFor="last_name">Last Name:&nbsp;</label>
            <input
                className="form-control"
                name="last_name"
                id="last_name"
                type="text"
                onChange={handleChange}
                value={formData.last_name}
                required
            />

            <label className="form-label" htmlFor="mobile_number">Mobile Number:&nbsp;</label>
            <input
                className="form-control"
                name="mobile_number"
                id="mobile_number"
                type="text"
                onChange={handleChange}
                value={formData.mobile_number}
                required
            />

            <label className="form-label" htmlFor="student_date">Student Date:&nbsp;</label>
            <input
                className="form-control"
                name="student_date"
                id="student_date"
                type="date"
                onChange={handleChange}
                value={formData.student_date}
                required
            />

            <label className="form-label" htmlFor="student_time">Student Time:&nbsp;</label>
            <input
                className="form-control"
                name="student_time"
                id="student_time"
                type="time"
                onChange={handleChange}
                value={formData.student_time}
                required
            />

            <label className="form-label" htmlFor="people">Party Size:&nbsp;</label>
            <input
                className="form-control"
                name="people"
                id="people"
                type="number"
                min="1"
                onChange={handleChange}
                value={formData.people}
                required
            />

            <button className="btn btn-primary m-1" type="submit" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-danger m-1" type="button" onClick={history.goBack}>Cancel</button>
        </form>
    );
}