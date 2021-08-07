import React, { useState, useEffect } from "react";
import { listStudents, listCourses } from "../utils/api";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewStudent from "../students/NewStudent"
import NotFound from "./NotFound";
import useQuery from "../utils/useQuery";
import NewCourse from "../courses/NewCourse";
import SeatStudent from "../students/SeatStudent";
import Search from "../search/Search";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 */
function Routes() {
    const [students, setStudents] = useState([]);
    const [studentsError, setStudentsError] = useState(null);

    const [courses, setCourses] = useState([]);
    const [coursesError, setCoursesError] = useState(null);

    const query = useQuery();
    const date = query.get("date") ? query.get("date") : today();

    useEffect(loadDashboard, [date]);

    /**
     * Grabs all current students and courses from an API call.
     */
    function loadDashboard() {
        const abortController = new AbortController();

        setStudentsError(null);
        setCoursesError(null);

        listStudents({ date: date }, abortController.signal)
            .then(setStudents)
            .catch(setStudentsError);

        listCourses(abortController.signal)
            .then((courses) => courses.sort((courseA, courseB) => courseA.course_id - courseB.course_id))
            .then(setCourses)
            .catch(setCoursesError);

        return () => abortController.abort();
    }

    return (
        <Switch>
            <Route exact={true} path="/">
                <Redirect to={`/dashboard`} />
            </Route>

            <Route exact={true} path="/students">
                <Redirect to={`/dashboard`} />
            </Route>

            <Route path="/students/new">
                <NewStudent
                    loadDashboard={loadDashboard}
                />
            </Route>

            <Route path="/students/:student_id/edit">
                <NewStudent
                    loadDashboard={loadDashboard}
                    edit={true}
                />
            </Route>

            <Route path="/students/:student_id/seat">
                <SeatStudent
                    courses={courses}
                    loadDashboard={loadDashboard}
                />
            </Route>

            <Route path="/courses/new">
                <NewCourse
                    loadDashboard={loadDashboard}
                />
            </Route>

            <Route path="/dashboard">
                <Dashboard
                    date={date}
                    students={students}
                    studentsError={studentsError}
                    courses={courses}
                    coursesError={coursesError}
                    loadDashboard={loadDashboard}
                />
            </Route>

            <Route path="/search">
                <Search />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Routes;
