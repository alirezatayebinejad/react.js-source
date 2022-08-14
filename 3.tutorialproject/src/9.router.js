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
	const [courses, setPosts] = useState(coursesInfo);

	return <div>mainCourse:{courses.find((course) => course.id == params.courseId).title}</div>;
}
