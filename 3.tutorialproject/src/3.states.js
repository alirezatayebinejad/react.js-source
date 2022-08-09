//states are like props almost but it is just for class components

//in app.js
import React, { Component } from "react";
import User from "./User";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//state should be always state if you type another name virtual dom is not going to be updated by react
			users: [
				{ id: 1, name: "ali" },
				{ id: 2, name: "reza" },
				{ id: 3, name: "sara" },
			],
			count: 0,
		};

		setTimeout(() => {
			//this will change and rerender the jsx //if you change state name it will not happen
			this.setState({
				users: [
					{ id: 1, name: "ahmad" },
					{ id: 2, name: "maryam" },
					{ id: 3, name: "saba" },
				],
			});
		}, 5000);
	}
	clickHandler() {
		this.setState((prevState) => {
			return { count: prevState.count + 1 };
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.clickHandler.bind(this)}>change</button>
				<p>count:{this.state.count}</p>
				<User {...this.state.users[0]} />
				<User {...this.state.users[1]} />
				<User {...this.state.users[2]} />
			</div>
		);
	}
}

//in User/User.js
import React from "react";

function User(props) {
	return <div>{props.name}</div>;
}

//export default User;
