import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Home from "./components/home";
import Target from "./components/target";
import AddTarget from "./components/target/add_target";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Splash from "./components/splash";
import { authenticate } from "./store/session";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/" exact={true}>
					{sessionUser && <Redirect to="/home" />}
					<Splash />
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/home" exact={true}>
					<Home />
				</ProtectedRoute>
				<ProtectedRoute path="/targets/new">
					<AddTarget />
				</ProtectedRoute>
				<ProtectedRoute path="/targets/:targetId">
					<Target />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
