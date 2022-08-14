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

export default App;
