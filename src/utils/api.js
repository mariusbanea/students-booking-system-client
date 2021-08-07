/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
    try {
        const response = await fetch(url, options);

        if (response.status === 204) {
            return null;
        }

        const payload = await response.json();

        if (payload.error) {
            return Promise.reject({ message: payload.error });
        }
        return payload.data;
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error.stack);
            throw error;
        }
        return Promise.resolve(onCancel);
    }
}

/**
 * Retrieves all existing student.
 * @returns {Promise<[student]>}
 *  a promise that resolves to a possibly empty array of student saved in the database.
 */

export async function listStudents(params, signal) {
    const url = new URL(`${API_BASE_URL}/students`);

    if (params) {
        Object.entries(params).forEach(([key, value]) =>
            url.searchParams.append(key, value.toString())
        );
    }

    return await fetchJson(url, { headers, signal, method: "GET" }, []);
}

/**
 * Creates a new student.
 */
export async function createStudent(student, signal) {
    const url = `${API_BASE_URL}/students`;

    const body = JSON.stringify({ data: student });

    return await fetchJson(url, { headers, signal, method: "POST", body }, []);
}

/**
 * Edits an existing student.
 */
export async function editStudent(student_id, student, signal) {
    const url = `${API_BASE_URL}/students/${student_id}`;

    const body = JSON.stringify({ data: student });

    return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/**
 * Updates a student's status.
 */
export async function updateStudentStatus(student_id, status, signal) {
    const url = `${API_BASE_URL}/students/${student_id}/status`;

    const body = JSON.stringify({ data: { status: status } });

    return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/**
 * Lists all courses in the database.
 */
export async function listCourses(signal) {
    const url = `${API_BASE_URL}/courses`;

    return await fetchJson(url, { headers, signal, method: "GET" }, []);
}

/**
 * Creates a new course.
 */
export async function createCourse(course, signal) {
    const url = `${API_BASE_URL}/courses`;

    const body = JSON.stringify({ data: course });

    return await fetchJson(url, { headers, signal, method: "POST", body }, []);
}

/**
 * Seats a student at a course.
 */
export async function seatCourse(student_id, course_id, signal) {
    const url = `${API_BASE_URL}/courses/${course_id}/seat`;

    const body = JSON.stringify({ data: { student_id: student_id } });

    return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/**
 * Finishes a course.
 */
export async function finishCourse(course_id, signal) {
    const url = `${API_BASE_URL}/courses/${course_id}/seat`;

    return await fetchJson(url, { headers, signal, method: "DELETE" }, []);
}