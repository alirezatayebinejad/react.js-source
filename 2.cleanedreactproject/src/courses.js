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

export default Courses;
