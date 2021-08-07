import React from "react";
import { finishCourse } from "../utils/api";

/**
 * This represents a row of data representing a course for a <course>.
 */
export default function CourseRow({ course, loadDashboard }) {
    if (!course) return null;

    /**
     * Called when the user wants to finish a course that is currently seated.
     */
    function handleFinish() {
        if (window.confirm("Is this course ready to seat new guests? This cannot be undone.")) {
            const abortController = new AbortController();

            finishCourse(course.course_id, abortController.signal)
                .then(loadDashboard);

            return () => abortController.abort();
        }
    }

    return (
        <tr>
            <th scope="row">{course.course_id}</th>
            <td>{course.course_name}</td>
            <td>{course.capacity}</td>
            <td data-course-id-status={course.course_id}>{course.status}</td>
            <td>{course.student_id ? course.student_id : "--"}</td>

            {course.status === "occupied" &&
                <td>
                    <button data-course-id-finish={course.course_id} onClick={handleFinish} type="button">Finish</button>
                </td>
            }
        </tr>
    );
}