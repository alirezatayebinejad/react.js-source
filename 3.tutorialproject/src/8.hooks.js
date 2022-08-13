//we can not use states and lifecycle in function components
//so we can use Hooks in function components

import React from "react";

//useState hook
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
