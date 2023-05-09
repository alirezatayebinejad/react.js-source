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

import { useState, useEffect } from "react"
import axios from "axios"

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
			console.log(response);
			setPosts(response.data)
		}
		fetchData();
	}, [])
	console.log(posts);
	return (
		<div className="App">
			{posts.length > 0 ?
				<div className="posts">
					{posts?.map((post) =>
						<div key={post.id}>
							<h2>{post.title}</h2>
						</div>
					)}
				</div> :
				<h1>loading...</h1>
			}

		</div>
	);
}

