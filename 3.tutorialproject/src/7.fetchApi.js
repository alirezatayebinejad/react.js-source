/*
this code is using react-bootstrap:
1.npm install react-bootstrap bootstrap
2.import 'bootstrap/dist/css/bootstrap.min.css'; //in app.js or in index.js
3.import { Table, Container, Alert } from "react-bootstrap"; //import components that we use
*/

import React, { Component } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; //here or in index.js

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			posts: [],
		};
	}
	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					posts: data,
				});
			});
	}
	render() {
		return (
			<Container className="mt-5">
				{this.state.posts.length > 0 ? (
					<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								<th>id</th>
								<th>title</th>
								<th>body</th>
							</tr>
						</thead>
						<tbody>
							{this.state.posts.map((post) => {
								return (
									<tr key={post.id}>
										<td>{post.id}</td>
										<td>{post.title}</td>
										<td>{post.body}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				) : (
					<Alert variant="info">loading...</Alert>
				)}
			</Container>
		);
	}
}
