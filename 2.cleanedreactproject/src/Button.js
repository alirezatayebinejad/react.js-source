import React, { Component } from "react";

export default class Button extends Component {
	yo = 5;
	clickHandler(a, e) {
		console.log(e);
	}
	render() {
		return (
			<div>
				<button onClick={this.clickHandler.bind(this, 2)}>click me</button>
			</div>
		);
	}
}
