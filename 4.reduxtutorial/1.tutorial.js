//install redux
//npm install @reduxjs/toolkit react-redux

//a simple app for redux structure
//in app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});

//in index.js
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

//in features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	count: 0,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		reset: (state) => {
			state.count = 0;
		},
		incrementByAmount: (state, action) => {
			state.count += action.payload;
		},
	},
});
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;
//export default counterSlice.reducer;

//in Counter component
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

function Counter() {
	const count = useSelector((state) => state.counter.count);
	const dispatch = useDispatch();

	const [incrementAmount, setIncrementAmount] = useState(0);

	const addValue = Number(incrementAmount) || 0;

	const resetAll = () => {
		setIncrementAmount(0);
		dispatch(reset());
	};

	return (
		<section>
			<p>{count}</p>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>
			<input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
			<div>
				<button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
				<button onClick={resetAll}>reset</button>
			</div>
		</section>
	);
}

//export default Counter;
