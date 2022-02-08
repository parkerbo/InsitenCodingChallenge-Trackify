import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ModalProvider from "./context/modal_context";
import "./index.css";
import App from "./App";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ModalProvider>
				<App />
			</ModalProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
