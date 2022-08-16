//we can not use states and lifecycle in function components
//so we can use Hooks in function components

import React, { useState } from "react";

//useState hook - for states in function components
function App() {
	const [count, setCount] = useState(0);
	const [users, setUser] = useState([
		{ id: 1, name: "Mohammad", age: 21 },
		{ id: 2, name: "Ali", age: 23 },
		{ id: 3, name: "Amin", age: 27 },
	]);
	const minusCount = () => {
		setCount(count - 1);
	};
	const plusCount = () => {
		setCount(count + 1);
	};
	const removeUser = (userId) => {
		setUsers(
			prevState.filter((user) => {
				let newUsers = prevState.filter((user) => {
					return user.id !== userId;
				});
				return newUsers;
			})
		);
	};
	return (
		<div>
			<button onClick={minusCount}>-</button>
			<h1>{count}</h1>
			<button onClick={plusCount}>+</button>
			<ul>
				{users.map((user) => (
					<li key={user.id} onClick={removeUser}>
						{user.name}-{user.age}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;

//useEffect - for lifecycle in function components
import React, { useState, useEffect } from "react";

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log("when component mount or updated this executes");
	});
	useEffect(() => {
		console.log("just when component mount");
	}, []);
	useEffect(() => {
		console.log("just when count state updates");
	}, [count]);
	useEffect(() => {
		console.log("just when component mount");
		return () => {
			console.log("just when component unmount");
		};
	}, []);
	const minusCount = () => {
		setCount((prevCount) => prevCount - 1);
		//setCount(count-1) better not to use this
	};
	const plusCount = () => {
		setCount((prevCount) => prevCount + 1);
	};
	return (
		<div>
			<button onClick={minusCount}>-</button>
			<h1>{count}</h1>
			<button onClick={plusCount}>+</button>
		</div>
	);
}

//create custom hooks : its just like a js function that does sth
//create a hook in a hook folder
import React, { useState, useEffect } from "react";
function useUpdateLogger(title) {
	const [value, setValue] = useState(title);
	useEffect(() => {
		console.log(value);
	}, [value]);

	return [value, setValue];
}
//export default useUpdateLogger
//and use it anywhere
import React, { useState, useEffect } from "react";
import useUpdateLogger from "./hooks/useUpdateLogger";
import "./App.css";

function App() {
	const [value, setValue] = useUpdateLogger("");

	return (
		<div className="App">
			<input value={value} onChange={(e) => setValue(e.target.value)} />
		</div>
	);
}
//export default App;
