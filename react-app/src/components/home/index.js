import "./home.css";
import {useSelector } from "react-redux";
import TargetCard from "./target_card";
import { useHistory } from "react-router-dom";
const Home = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const targets = sessionUser.targets;
	const history = useHistory();

	return (
		<div className="home-main">
			<h1>Target Companies</h1>
			<button id="home-add-target" onClick={()=> history.push("/targets/new")}>Add a New Target</button>
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
