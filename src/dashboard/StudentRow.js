import React from "react";
import { Link } from "react-router-dom";
import { updateStudentStatus } from "../utils/api";

/**
 * This represents a row of data representing a student for a <course>.
 */
export default function StudentRow({ student, loadDashboard }) {
    if (!student || student.status === "finished") return null;

    /**
     * This function is called if the user wants to cancel a student.
     */
    function handleCancel() {
        if (window.confirm("Do you want to cancel this student? This cannot be undone.")) {
            const abortController = new AbortController();

            updateStudentStatus(student.student_id, "cancelled", abortController.status)
                .then(loadDashboard);

            return () => abortController.abort();
        }
    }

    return (
        <tr>
            <th scope="row">{student.student_id}</th>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.mobile_number}</td>
            <td>{student.student_date.substr(0, 10)}</td>
            <td>{student.student_time.substr(0, 5)}</td>
            <td>{student.people}</td>
            <td data-student-id-status={student.student_id}>{student.status}</td>

            {student.status === "booked" &&
                <>
                    <td>
                        <Link to={`/students/${student.student_id}/edit`}>
                            <button className="btn btn-secondary" type="button">Edit</button>
                        </Link>
                    </td>

                    <td>
                        <button className="btn btn-danger" type="button" onClick={handleCancel} data-student-id-cancel={student.student_id}>
                            Cancel
                        </button>
                    </td>

                    <td>
                        <a href={`/students/${student.student_id}/seat`}>
                            <button className="btn btn-primary" type="button">Seat</button>
                        </a>
                    </td>
                </>
            }
        </tr>
    );
}