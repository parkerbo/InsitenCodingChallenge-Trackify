import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import TrackifyLogo from "../../assets/images/TrackifyLogo.svg";
import "./navbar.css";
import useWindowDimensions from "../WindowHook";

const NavBar = () => {
	const { height, width } = useWindowDimensions();
	const [menu, setMenu] = useState(false);
	return (
		<nav className="nav-bar">
			<div>
				<img src={TrackifyLogo} alt="Logo of the trackify app" />
			</div>
			{width > 600 && (
				<div className="nav-bar-links">
					<button className="nav-bar-button">Log In</button>
					<button className="nav-bar-button">Sign Up</button>
					<button id="nav-bar-try">Give it a try</button>
				</div>
			)}
			{width <= 600 && (
				<div className="nav-bar-mobile-menu">
					{width > 389 && (
						<button id="nav-bar-try" style={{ marginRight: 10 }}>
							Give it a try
						</button>
					)}

					<div id="nav-bar-menu-icon" onClick={(e) => {
            e.preventDefault();
            setMenu(!menu)
          } }>
						{menu ? (
							<AiOutlineClose size="1.6rem" />
						) : (
							<AiOutlineMenu size="1.6rem" />
						)}
						{menu && (
							<div id="nav-bar-menu-items">
								<button className="nav-bar-button">Log In</button>
								<button className="nav-bar-button">Sign Up</button>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
