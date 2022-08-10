import React, { Component } from "react";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			textareaValue: "",
			isLogin: false,
		};
	}
	usernameHandler(event) {
		this.setState({
			username: event.nativeEvent.target.value,
		});
	}
	isLoginHandler(event) {
		this.setState({
			isLogin: event.nativeEvent.target.checked,
		});
	}
	render() {
		return (
			<div>
				<div>
					<h3>{this.state.username}</h3>
					<input type="text" value={this.state.username} onChange={this.usernameHandler.bind(this)} />
				</div>
				<div>
					<label htmlFor="login">Login</label>
					<input type="checkbox" id="login" value={this.state.isLogin} onChange={this.isLoginHandler.bind(this)} />
				</div>
			</div>
		);
	}
}
