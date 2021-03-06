import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import TrackifyLogo from "../../assets/images/TrackifyLogo.svg";
import "./navbar.css";
import useWindowDimensions from "../WindowHook";
import { AiFillHome} from "react-icons/ai";
import {BsFillPlusCircleFill} from 'react-icons/bs'

const NavBar = () => {
	const { height, width } = useWindowDimensions();
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();
	const [menu, setMenu] = useState(false);

	const loginDemo = async () => {
		await dispatch(sessionActions.login("demo@trackify.com", "password"));
	};

	return (
		<nav className="nav-bar">
			<div>
				<NavLink to="/">
					<img src={TrackifyLogo} alt="Logo of the trackify app" />
				</NavLink>{" "}
			</div>

			{width > 600 && (
				<div className="nav-bar-links">
					{!sessionUser && (
						<>
							<button
								className="nav-bar-button"
								onClick={() => history.push("/login")}
							>
								Log In
							</button>
							<button
								className="nav-bar-button"
								onClick={() => history.push("/sign-up")}
							>
								Sign Up
							</button>
							<button id="nav-bar-try" onClick={loginDemo}>
								Demo Login
							</button>
						</>
					)}
					{sessionUser && (
						<>
							<h3 style={{ marginRight: 20 }}>
								Welcome, {sessionUser.username}
							</h3>
							<div id="nav-bar-icon-link" onClick={() => history.push("/home")}>
								<AiFillHome />
							</div>
							<div
								id="nav-bar-icon-link"
								className="add-new-target"
								onClick={() => history.push("/targets/new")}
							>
								<span className="add-new-target-tooltip">New Target</span>
								<BsFillPlusCircleFill size="0.9em" />
							</div>

							<LogoutButton />
						</>
					)}
				</div>
			)}

			{width <= 600 && !sessionUser && (
				<div className="nav-bar-mobile-menu">
					{width > 389 && (
						<button
							id="nav-bar-try"
							style={{ marginRight: 10 }}
							onClick={loginDemo}
						>
							Demo Login
						</button>
					)}

					<div
						id="nav-bar-menu-icon"
						onClick={(e) => {
							e.preventDefault();
							setMenu(!menu);
						}}
					>
						{menu ? (
							<AiOutlineClose size="1.6rem" />
						) : (
							<AiOutlineMenu size="1.6rem" />
						)}
						{menu && (
							<div id="nav-bar-menu-items">
								<button
									className="nav-bar-button"
									onClick={() => history.push("/login")}
								>
									Log In
								</button>
								<button
									className="nav-bar-button"
									onClick={() => history.push("/sign-up")}
								>
									Sign Up
								</button>
							</div>
						)}
					</div>
				</div>
			)}
			{width <= 600 && sessionUser && (
				<div className="nav-bar-links">
					<div id="nav-bar-icon-link" onClick={() => history.push("/home")}>
						<AiFillHome />
					</div>
					<div
						id="nav-bar-icon-link"
						className="add-new-target"
						onClick={() => history.push("/targets/new")}
					>
						<span className="add-new-target-tooltip">New Target</span>
						<BsFillPlusCircleFill  />
					</div>

					<LogoutButton />
				</div>
			)}
		</nav>
	);
};

export default NavBar;
