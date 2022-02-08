import "./target.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTarget } from "../../store/target";
import LoadingScreen from "../loading";
import CompanyLogo from "../company_logo";
import { IoGlobeSharp } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";

const Target = () => {
	const { targetId } = useParams();
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const [target, setTarget] = useState("");
	const [contacts, setContacts] = useState("");
	const [financials, setFinancials] = useState("");

	useEffect(async () => {
		const res = await dispatch(getTarget(targetId));
		setTarget(res.target);
		setContacts(res.contacts);
		setFinancials(res.financials);
		setLoaded(true);
		console.log(res);
	}, [dispatch, targetId]);

	if (!loaded) {
		return null;
		// return (
		//     <LoadingScreen />
		// )
	}
	return (
		<div className="target-body">
			<div className="target-main">
				<div className="target-main-intro">
					<CompanyLogo name={target.company_name} />
					<div id="target-options"></div>
					<div className="target-intro-details">
						<h1>{target.company_name}</h1>
						<h3>{target.location ? target.location : null}</h3>
						<h5>
							{target.website ? (
								<>
									<IoGlobeSharp size="1.3em" />
									<a target="_blank" href={target.website}>
										{target.website}
									</a>
								</>
							) : null}
						</h5>
						<p>{target.description}</p>
					</div>
				</div>
				<div className="target-detailed-view">
					<div className="half-widget" style={{ marginRight: "auto" }}>
						<div className="widget-header">
							<h2>
								<MdInfo />
								Company Info
							</h2>
						</div>
						<div className="widget-details">
							<div className="widget-row">
								<div id="widget-row-title">Name</div>
								<div id="widget-row-value">{target.company_name}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Current Status</div>
								<div id="widget-row-value">{target.status}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Location</div>
								<div id="widget-row-value">{target.location}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Phone</div>
								<div id="widget-row-value">{target.phone}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Website</div>
								<div id="widget-row-value">{target.website}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Last Updated</div>
								<div id="widget-row-value">{target.updated_at}</div>
							</div>
						</div>
					</div>
					<div className="half-widget">
						<div className="widget-header">
							<h2>
								<RiContactsBookFill />
								Contacts
							</h2>
						</div>
					</div>
					<div className="half-widget" style={{ marginRight: "auto" }}>
						<div className="widget-header">
							<h2>
								<AiOutlineStock />
								Financials
							</h2>
						</div>
					</div>
					<div className="half-widget">
						<div className="widget-header">
							<h2>
								<HiPencilAlt />
								Notes
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Target;
