//in jsx events are camelCase and syntax is onEvent={function}
//in app.js
import "./App.css";
import Button from "./button";

function App() {
	return (
		<div className="App">
			<Button></Button>
		</div>
	);
}

export default App;

//in button.js
import React from "react";

function Button() {
	function clickHandler() {
		alert("you clicked the button");
	}
	return (
		<div>
			<button onClick={clickHandler}>click me</button>
		</div>
	);
}
//export default Button;

//in class components
import React, { Component } from "react";

class Button extends Component {
	constructor(props) {
		super(props);
		this.age = 12;
	}
	clickHandler() {
		console.log(this);
	}
	render() {
		return (
			<div>
				<button onClick={this.clickHandler.bind(this)}>click me</button>
				//we bind it to make this keyword to point to this class otherwise it is udefined in the handler
			</div>
		);
	}
}
