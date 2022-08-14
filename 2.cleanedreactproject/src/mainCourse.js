import React, { useState } from "react";
import { useParams } from "react-router-dom";
import coursesInfo from "./data";

function MainCourse() {
	let params = useParams();
	const [courses, setPosts] = useState(coursesInfo);

	return <div>mainCourse:{courses.find((course) => course.id == params.courseId).title}</div>;
}

export default MainCourse;
