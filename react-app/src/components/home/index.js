import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TargetCard from "./target_card";
const Home = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const targets = sessionUser.targets;
	return (
		<div className="home-main">
			<h1>Target Companies</h1>
				<div className="targets-list">
					{targets &&
						Object.keys(targets).map((key) => (
							<TargetCard key={targets[key].id} target={targets[key]} />
						))}
				</div>
			</div>
	);
};

export default Home;
