//instead of creating two files app and component I write all of them in one file just for tutorial purposes

//props is like attributes in html and we can customize data in our components

//in App.js file
import "./App.css";
import User from "./User/User";

function App() {
	return (
		<div className="App">
			<User name="sony" count={2} />
			<User name="hp" count={0} />
		</div>
	);
}

export default App;

//in User/User.js file
import React from "react";

function User(props) {
	return (
		<div>
			<h1>{props.name}</h1>
		</div>
	);
}

//export default User;

//condition props
//in User/User.js file
function User(props) {
	return (
		props.count && ( //if the value is 0 and false rest is not executed
			<div>
				<h1>{props.name}</h1>
			</div>
		)
	);
}

//props destucturing: let {name,count}=props - then use name coun in jsx instead of props.name etc.

//spread props sending
//in App.js file
function App() {
	const allProd = [
		{ name: "sony", count: 2 },
		{ name: "hp", count: 0 },
	];
	return (
		<div className="App">
			<User {...allProd[0]} />
			<User {...allProd[1]} />
		</div>
	);
}

//for default props when a prop is not available
function User({ name = "no name", count = "not available" }) {
	return (
		<div>
			<h1>
				name:{name}-count:{count}
			</h1>
		</div>
	);
}

//default children prop
function User({ name = "no name", count = "not available", children }) {
	return (
		<div>
			<h1>
				name:{name}-count:{count}
				{children}//it is everything between user tag in App
			</h1>
		</div>
	);
}
function App() {
	const allProps = [
		{ name: "sony", count: 2 },
		{ name: "hp", count: 0 },
	];
	return (
		<div className="App">
			<User {...allProps[0]}></User>
			<User {...allProps[1]}>
				<p>insid country ship only</p>
			</User>
		</div>
	);
}

//an example for a class component props
function App() {
	return (
		<div className="container">
			<Modal message="you signed in"></Modal>
		</div>
	);
}
//in modal/modal.js
import React, { Component } from "react";
class Modal extends React.Component {
	render() {
		return (
			<div>
				<div className="popup">
					<p>{this.props.message}</p>
					<ul>
						<li>confirm</li>
						<li>reject</li>
					</ul>
				</div>
			</div>
		);
	}
}
Modal.defaultProps = {
	message: "you have not been signed up",
};

//for props type validationx import prop-types library
//install: npm install prop-types
//import PropTypes from "prop-types"
import PropTypes from "prop-types";
//in modal/modal.js
import React, { Component } from "react";
class Modal extends React.Component {
	render() {
		return (
			<div>
				<div className="popup">
					<p>{this.props.message}</p>
					<ul>
						<li>confirm</li>
						<li>reject</li>
					</ul>
				</div>
			</div>
		);
	}
}
Modal.defaultProps = {
	message: "you have not been signed up",
};
//this is type validation
Modal.propTypes = {
	message: PropTypes.string, //this make the message be string for sure otherwise sends error
};
//or like
Modal.propTypes = {
	message: PropTypes.oneOf(["yes", "no"]), //this make the message be string for sure otherwise sends error
};
//there are other things that you can find in prop types document
