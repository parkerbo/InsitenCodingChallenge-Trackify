import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import TrackifyLogo from "../../assets/images/TrackifyLogo.svg";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			}
		} else {
      setErrors(['Password fields must match.'])
    }
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="auth-form-main">
			<div className="auth-form-card">
				<div id="trackify-logo">
					<img src={TrackifyLogo} alt="Logo for trackify" />
				</div>

				{errors.length > 0 && (
					<div className="form-errors">
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
				)}
				<form onSubmit={onSignUp}>
					<div>
						<label>User Name</label>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={updateUsername}
							value={username}
							required={true}
						></input>
					</div>
					<div>
						<label>Email</label>
						<input
							type="text"
							placeholder="email"
							name="email"
							onChange={updateEmail}
							value={email}
							required={true}
						></input>
					</div>
					<div>
						<label>Password</label>
						<input
							type="password"
							placeholder="password"
							name="password"
							onChange={updatePassword}
							value={password}
							required={true}
						></input>
					</div>
					<div>
						<label>Repeat Password</label>
						<input
							type="password"
							placeholder="repeat password"
							name="repeat_password"
							onChange={updateRepeatPassword}
							value={repeatPassword}
							required={true}
						></input>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<button id="auth-form-button" type="submit">
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
