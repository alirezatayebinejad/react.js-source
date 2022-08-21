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
//we have useLayoutEffect => just like useEffect but sync it will finish before rendering jsx
//when we have api call we use it but we should use useEffect for all the things we can

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

//useMemo hook - when we don't want to execute a big process when every part of program updated but only a specific part
import React, { useState, useMemo } from "react";

function App() {
	const [firstCount, setFirstCount] = useState(0);
	const [secondCount, setSecondCount] = useState(0);
	const [text, setText] = useState("");

	const firstCounterHandler = () => {
		setFirstCount((prevCount) => prevCount + 1);
	};

	const secondCounterHandler = () => {
		setSecondCount((prevCount) => prevCount + 1);
	};

	const isEven = useMemo(() => {
		let index = 0;
		while (index < 2000000000) {
			index++;
		}

		return firstCount % 2 === 0; //useMemo is not holding a function it is going to be true or false
	}, [firstCount]);

	return (
		<div>
			<button onClick={firstCounterHandler}>Add First Counter: {firstCount}</button>
			{isEven ? "Even" : "Odd"}
			<br />
			<button onClick={secondCounterHandler}>Add Second Counter: {secondCount}</button>
		</div>
	);
	//now that big loop is only executes for clicking the firt button
}

//useCallback - just like memo but this is for referenced types like functions and it holds function not bool
import React, { useState, memo, useCallback } from "react";

function App() {
	const [counter, setCounter] = useState(0);
	const [title, setTitle] = useState("");

	console.log("App Run");
	const addCounter = useCallback(() => {
		setCounter((prevCount) => prevCount + 1);
	}, [counter]);
	const minusCounter = useCallback(() => {
		setCounter((prevCount) => prevCount - 1);
	}, [counter]);

	return (
		<div>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			<Title title={title} />
			<h3>{counter}</h3>
			<Bottons add={addCounter} minus={minusCounter} />
		</div>
	);
}

const Title = memo(({ title }) => {
	console.log("title Run");
	return <h3>{title}</h3>;
});

const Buttons = memo(({ add, minus }) => {
	//this memo is not stop it from executing we should use useCallback
	console.log("Buttons Run");
	return (
		<>
			<button onClick={add}>add</button>
			<button onClick={minus}>minus</button>
		</>
	);
});

//memo vs useMemo => they're same but memo can memoize whole component in top level but useMemo is just for a part insid the function

//useRef hook - stores data like useState but it will not render the jsx again when updates
//useRef can hold html elements like we used to getElementby... in vanilla js but in react we use useRef and Ref={refName}
//
import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
	const usernameInputRef = useRef();
	const titleRef = useRef(); //this holds an object with current property that holds the element

	useEffect(() => {
		console.log(usernameInputRef); //gives the input tag and its properties
		usernameInputRef.current.focus();
	}, []);

	const addNewValue = () => {
		usernameInputRef.current.value = "SabzLearn.ir :))";
	};

	const addNewClass = () => {
		usernameInputRef.current.classList.add("bg-red");
		titleRef.current.classList.add("color-blue");
	};

	return (
		<div>
			<h3 ref={titleRef}>SabzLearn.ir</h3>
			<input ref={usernameInputRef} type="text" placeholder="Username" />
			<button onClick={addNewValue}>Add New Value</button>
			<button onClick={addNewClass}>Add New Class</button>
		</div>
	);
}

//useId hook - for creating unique id in project
import React, { useId } from "react";

function App() {
	const usernameID = useId();
	const passwordID = useId();

	console.log("UserName ID:", usernameID);
	console.log("Password ID:", passwordID);

	return (
		<div>
			<form action="#">
				<label htmlFor={usernameID + "-value"}>Your Username: </label>
				<input type="text" id={usernameID + "value"} placeholder="Username" />
				<hr />
				<label htmlFor={passwordID + "-value"}>Password: </label>
				<input type="text" id={passwordID + "-value"} placeholder="Password" />
			</form>
		</div>
	);
}

//useContex - when we have user subuser subsubuser subsubsubuser instead of using props we use contex for sub sub sub component
//in contex folder and usernameContex
import { createContext, useState } from "react";
export const UsernameContext = createContext();

const UsernameProvider = ({ children }) => {
	const [username, setUserName] = useState("Mohammad Amin");

	return <UsernameContext.Provider value={username}>{children}</UsernameContext.Provider>;
};
//export default UsernameProvider
//in app.js
import React, { useState } from "react";
import User from "./Components/User";
import UsernameProvider from "./Contexts/UsernameContext";

function App() {
	return (
		<UsernameProvider>
			<div>
				<User />
			</div>
		</UsernameProvider>
	);
}
//export default App;
//in user.js
import React, { useContext } from "react";
import SubUser from "./SubUser";

import { UsernameContext } from "./../Contexts/UsernameContext";

function User() {
	const username = useContext(UsernameContext);

	console.log(username);

	return (
		<div>
			<h2>User: {username}</h2>
			<SubUser />
		</div>
	);
}
//export default User;
//in subsubsubuser
import React, { useContext } from "react";

import { UsernameContext } from "./../Contexts/UsernameContext";

function SubSubSubUser() {
	const username = useContext(UsernameContext);

	return (
		<div>
			<h2>SubSubSubUser: {username}</h2>
		</div>
	);
}
//export default SubSubSubUser;
