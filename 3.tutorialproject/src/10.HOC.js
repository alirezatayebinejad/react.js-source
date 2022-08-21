//HOC => higher order component
//when we want to create multiple component which have the same logic
//HOC gets a component as an input do sth to it and return the component

//in hoc file
import React, { useState } from "react";

function CourseHoc(OriginalComponent, courseTitle, coursePrice) {
	function NewComponent() {
		const [title, setTitle] = useState(courseTitle);
		const [price, setPrice] = useState(coursePrice);

		const increasePrice = () => {
			setPrice((prevPrice) => prevPrice * 2);
		};

		return <OriginalComponent title={title} increasePrice={increasePrice} price={price} />;
	}

	return NewComponent;
}
//export default CourseHoc;

//two other component as input
import React, { useState } from "react";
import CourseHoc from "../HOCs/CourseHoc";

function Javascript({ title, increasePrice, price }) {
	return (
		<div>
			<h3>Course Title: {title}</h3>
			<button onClick={increasePrice}>Increase Course Price (Price = {price})</button>
		</div>
	);
}
//export default CourseHoc(Javascript, 'JavaScript Expert', 2_000_000);
import React, { useState } from "react";
import CourseHoc from "../HOCs/CourseHoc";

function Reactjs({ title, increasePrice, price }) {
	return (
		<div>
			<h3>Course Title: {title}</h3>
			<button onClick={increasePrice}>Increase Course Price (Price = {price})</button>
		</div>
	);
}
//export default CourseHoc(Reactjs, "React Js", 2_200_000);
