import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Home = () => {
const sessionUser = useSelector((state) => state.session.user);
const history = useHistory();
const targets = sessionUser.targets;
    return (
			<div>
				{targets &&
					Object.keys(targets).map((key) => (
						<div key={targets[key].id}>
							<h2>{targets[key].company_name}</h2>
							<h3>{targets[key].location}</h3>
							<h3>{targets[key].status}</h3>
                            <button onClick={() => history.push(`/targets/${targets[key].id}`)}>View More</button>
						</div>
					))}
			</div>
		);
}

export default Home;
