import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./auth-forms.css";
import TrackifyLogo from "../../assets/images/TrackifyLogo.svg";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/home" />;
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
				<form onSubmit={onLogin}>
					<div>
						<label>Email</label>
						<input
							name="email"
							type="text"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
							required={true}
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							name="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={updatePassword}
							required={true}
						/>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "row",
							}}
						>
							<button id="auth-form-button" type="submit">
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
