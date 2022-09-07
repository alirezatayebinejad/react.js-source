//npm install @reduxjs/toolkit react-redux

//in app/store.js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {},
});
//in index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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
