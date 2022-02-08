import "./splash.css";
import { NavLink } from "react-router-dom";
import {MdOutlineTrackChanges} from 'react-icons/md'
import { BsFillCheckCircleFill, BsClipboardData } from "react-icons/bs";

const Splash = () => {
	return (
		<div className="splash-main">
			<div className="splash-headings">
				<h1 id="splash-heading1">
					Track your target companies <br /> without the hassle.
				</h1>
				<h2 id="splash-heading2">
					Trackify helps you organize data about potential acquisitions for you
					and your team.
				</h2>
			</div>
			<div className="splash-links">
				<NavLink id="splash-sign-up-button" to="/sign-up">
					Sign up for free
				</NavLink>
				<NavLink id="splash-log-in-link" to="/login">
					Already have an account? Log in
				</NavLink>
			</div>
			<div className="splash-details">
				<div className="details-item">
					<div>
						<MdOutlineTrackChanges size="2.5em" />
					</div>

					<p>Track your target companies with ease all in one place.</p>
				</div>
				<div className="details-item">
					<div>
						<BsFillCheckCircleFill size="2.5em" />
					</div>

					<p>
						Make smart business decisions by viewing your target companies and
						adding important info.
					</p>
				</div>
				<div className="details-item">
					<div>
						<BsClipboardData size="2.5em" />
					</div>

					<p>
						Import financial data with a click to reduce data logging time and
						view a company's financial health.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Splash;
