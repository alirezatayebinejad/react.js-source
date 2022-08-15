// for creating spa(single page aplication) website
// install routing package: npm install
//in index.js
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

//in app.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./courses";
import Users from "./users";
import Home from "./home";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home></Home>}></Route>
			<Route path="/courses" element={<Courses />}></Route>
			<Route path="/users" element={<Users></Users>}></Route>
		</Routes>
	);
}

export default App;
/*
now we have multiple rutes that points to a component like home, courses or users
domain.com/users show users component content
*/

//to link them in spa way
import React from "react";
import { Link } from "react-router-dom";

function home() {
	return (
		<div>
			<Link to="/users">users</Link>
			<Link to="/courses">courses</Link>
		</div>
	);
}

//for route pages: like when we have a course website and user goes to a course page by clicking on a course link
//we use useParam hook
//in app.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./courses";
import Users from "./users";
import Home from "./home";
import MainCourse from "./mainCourse";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home></Home>}></Route>
			<Route path="/courses" element={<Courses />}></Route>
			<Route path="/courses/:courseId" element={<MainCourse />}></Route>
			<Route path="/users" element={<Users></Users>}></Route>
			<Route path="*" element={<notFound></notFound>}></Route> // for 404 pages
		</Routes>
	);
}
//in data
let courses = [
	{ id: 1, title: "JS" },
	{ id: 2, title: "React" },
	{ id: 3, title: "Vue" },
	{ id: 4, title: "Node Js" },
];
//export default courses;

//in home
import React from "react";
import { Link } from "react-router-dom";

function home() {
	return (
		<div>
			<Link to="/users">users</Link>
			<Link to="/courses">courses</Link>
		</div>
	);
}

//in courses
import React from "react";
import coursesInfo from "./data";
import { useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
	const [courses, setCourses] = useState(coursesInfo);
	return (
		<div>
			{courses.map((course) => {
				return (
					<div key={course.id}>
						<Link to={`${course.id}`}>
							<h1>{course.title}</h1>
						</Link>
						<hr />
					</div>
				);
			})}
		</div>
	);
}

//in mainCourse
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import coursesInfo from "./data";

function MainCourse() {
	let params = useParams();
	const [courses, setcourses] = useState(coursesInfo);

	return <div>mainCourse:{courses.find((course) => course.id == params.courseId).title}</div>;
}

//if we want to redirect user to home page if he add an unvalid param course id in url we use navigator
import { useParams, Navigate } from "react-router-dom";
import Data from "./../Datas";

function MainCourse() {
	let params = useParams();
	const [courses, setCourses] = useState(Data);

	let hasCourse = courses.some((course) => course.id == params.courseID);

	console.log(hasCourse);

	return <div>{!hasCourse ? <Navigate to="/" /> : <>Main course : {courses.find((course) => course.id == params.coursId).title}</>}</div>;
}

//to create subroutes we use outlet frim react-router-dom
//in app.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./courses";
import Users from "./users";
import Home from "./home";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home></Home>}></Route>
			<Route path="/courses/*" element={<Courses />}>
				<Route path="free" element={<h2>this is free courses page</h2>} /> {/*these two are sub routes */}
				<Route path="pain" element={<h2>this is paid courses page</h2>} />
			</Route>
			<Route path="/users" element={<Users></Users>}></Route>
		</Routes>
	);
}
//then we use outlet where we want these sub routes to be shown
//like in courses page
import React from "react";
import coursesInfo from "./data";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Courses() {
	const [courses, setCourses] = useState(coursesInfo);
	return (
		<div>
			{courses.map((course) => {
				return (
					<div key={course.id}>
						<Link to={`${course.id}`}>
							<h1>{course.title}</h1>
						</Link>
						<hr />
					</div>
				);
			})}
			<hr />
			<Outlet></Outlet>
		</div>
	);
}

//better way to use routhes: useRouthes hook
//in routes.js
import Courses from "./components/Courses";
import MainCourse from "./components/MainCourse";
import About from "./components/About/About";

let routes = [
	{ path: "/courses", element: <Courses /> },
	{ path: "/course/:courseID", element: <MainCourse /> },

	{
		path: "/about/*",
		element: <About />,
		children: [
			{ path: "setting", element: <p style={{ textAlign: "center" }}> Setting</p> },
			{ path: "dashboard", element: <p style={{ textAlign: "center" }}>Dashboard</p> },
		],
	},
];
//in app.js
import React from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import routes from "./routes";

function App() {
	let router = useRoutes(routes);

	return (
		<>
			<Header />
			{router}
		</>
	);
}

//private routes
//in routhes.js
import Courses from "./components/Courses";
import MainCourse from "./components/MainCourse";
import About from "./components/About/About";
import Login from "./components/Login";
import Panel from "./components/Panel";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

let Routes = [
	{ path: "/courses", element: <Courses /> },
	{ path: "/course/:courseID", element: <MainCourse /> },
	{
		path: "/about/*",
		element: <About />,
		children: [
			{ path: "setting", element: <p style={{ textAlign: "center" }}> Setting</p> },
			{ path: "dashboard", element: <p style={{ textAlign: "center" }}>Dashboard</p> },
		],
	},
	{ path: "/login", element: <Login /> },
	{
		path: "/*",
		element: <PrivateRoute />,
		children: [
			{ path: "panel", element: <Panel /> },
			{ path: "dashboard", element: <Dashboard /> },
		],
	},
];
//export default routes
//in privateRoute.js
import React from "react";
import { isLogin } from "./../utils";
import { Navigate, Outlet } from "react-router-dom";

function Panel({ children }) {
	let isUserLogin = isLogin("mohammad");

	console.log(isUserLogin);

	return <div>{isUserLogin ? <Outlet /> : <Navigate to="/login" />}</div>;
}

//useNavigate hook
import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
	let navigate = useNavigate();

	return (
		<div>
			<h3 style={{ textAlign: "center" }}>Welcome To About Page :))</h3>

			<button
				onClick={() => {
					// navigate(-1) one before in history
					navigate("/login");
				}}
			>
				ثبت نام در دوره
			</button>
		</div>
	);
}

//use location hook
import React, { useState } from "react";
import CoursesData from "./../CoursesData";
import Course from "./Course";
import { useLocation } from "react-router-dom";

function Courses() {
	const [courses, setCourses] = useState(CoursesData);

	let location = useLocation();

	console.log(location);

	return (
		<div style={{ display: "flex", justifyContent: "space-evenly", marginTop: 40 }}>
			{courses.map((course) => (
				<Course key={course.id} {...course} />
			))}
		</div>
	);
}
