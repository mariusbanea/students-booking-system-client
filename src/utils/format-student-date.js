import { formatAsDate } from "./date-time";

function formatDate(student) {
    student.student_date = formatAsDate(student.student_date);
    return student;
}

/**
 * Formats the student_date property of a student.
 * @param students
 *  a single student, or an array of students.
 * @returns {[student]|student}
 *  the specified student(s) with the student_date property formatted as YYYY-MM-DD.
 */
export default function formatStudentDate(students) {
    return Array.isArray(students) ?
        students.map(formatDate) :
        formatDate(students);
}