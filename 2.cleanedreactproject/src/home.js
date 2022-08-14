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
export default home;
