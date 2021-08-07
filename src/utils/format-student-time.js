import { formatAsTime } from "./date-time";

function formatTime(student) {
    student.student_time = formatAsTime(student.student_time);
    return student;
}

/**
 * Formats the student_time property of a student.
 * @param students
 *  a single student, or an array of students.
 * @returns {[student]|student}
 *  the specified student(s) with the student_time property formatted as HH:MM.
 */
export default function formatStudentTime(students) {
    return Array.isArray(students) ?
        students.map(formatTime) :
        formatTime(students);
}