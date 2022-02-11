import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addTarget } from "../../store/target";
import { addTargetToSession } from "../../store/session";
import "./add_target.css"

const AddTarget = () => {
	const [errors, setErrors] = useState([]);
	const [companyName, setCompanyName] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [phone, setPhone] = useState("");
	const [website, setWebsite] = useState("");
	const [status, setStatus] = useState("Researching");
    const dispatch = useDispatch();
    const history = useHistory();

    const onCreate = async (e) => {
			e.preventDefault();
			const newTarget = {
				company_name: companyName,
				location: location,
				description: description,
				phone: phone,
				website: website,
				status: status,
			};
			const data = await dispatch(addTarget(newTarget));
			if (data.errors) {
				setErrors(data.errors);
			} else {
                await dispatch(addTargetToSession(data));
				history.push(`/targets/${data.id}`);
			}
		};

    const updateCompanyName = (e) => {
			setCompanyName(e.target.value);
		};

		const updateLocation = (e) => {
			setLocation(e.target.value);
		};

		const updateDescription = (e) => {
			setDescription(e.target.value);
		};

		const updatePhone = (e) => {
			setPhone(e.target.value);
		};

		const updateWebsite = (e) => {
			setWebsite(e.target.value);
		};

		const updateStatus = (e) => {
			setStatus(e.target.value);
		};

	return (
		<div className="add-target-form-main">
			<div className="add-target-form-card">
				<div id="add-target-header">Create Target</div>
				<div id="add-target-info">You will be able to add contact and financial info once you submit this information first.</div>
				{errors.length > 0 && (
					<div className="form-errors">
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
				)}
				<form onSubmit={onCreate}>
					<div>
						<label>
							Company Name <span id="form-required">(required)</span>
						</label>
						<input
							type="text"
							name="company_name"
							onChange={updateCompanyName}
							value={companyName}
							required={true}
						></input>
					</div>
					<div>
						<label>Description</label>
						<textarea
							name="description"
							onChange={updateDescription}
							value={description || ""}
						></textarea>
					</div>
					<div>
						<label>Location</label>
						<input
							type="text"
							name="location"
							onChange={updateLocation}
							value={location}
						></input>
					</div>
					<div>
						<label>Phone</label>
						<input
							type="text"
							name="phone"
							placeholder="xxx-xxx-xxxx"
							onChange={updatePhone}
							value={phone}
						></input>
					</div>
					<div>
						<label>Website</label>
						<input
							type="url"
							name="website"
							onChange={updateWebsite}
							value={website}
						></input>
					</div>
					<div>
						<label>
							Status <span id="form-required">(required)</span>
						</label>
						<select name="status" onChange={updateStatus} value={status}>
							<option>Researching</option>
							<option>Pending Approval</option>
							<option>Approved</option>
							<option>Declined</option>
						</select>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<button id="add-target-form-button" type="submit">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTarget;
