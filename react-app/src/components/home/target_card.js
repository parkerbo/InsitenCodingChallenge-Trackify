import "./target_card.css";
import { useHistory } from "react-router-dom";
const TargetCard = ({ target }) => {
	const history = useHistory();

	return (
		<div
			className="target-card"
			onClick={() => history.push(`/targets/${target.id}`)}
		>
			<div id="card-header">
				<h2>{target.company_name}</h2>
			</div>
			<div id="card-row">
				<h3>{target.location}</h3>
				<div className={`target-status-card ${target.status.toLowerCase()}`}>
					{target.status}
				</div>
			</div>
			<div id="card-row">
				<div>{target.website}</div>
				<div id="card-phone">{target.phone}</div>
			</div>

			<div id="card-button">
				<div onClick={() => history.push(`/targets/${target.id}`)}>Details</div>
			</div>
		</div>
	);
};

export default TargetCard;
