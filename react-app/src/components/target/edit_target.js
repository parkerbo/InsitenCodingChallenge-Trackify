import "./edit_target.css";

import Modal from "../modal";
import { useState } from "react";
import { useModal } from "../../context/modal_context";
import { useDispatch } from "react-redux";
import { editTarget } from "../../store/target";
import { updateTargetToSession } from "../../store/session";

const EditTargetForm = ({ target }) => {
	const { showEditTargetForm, setShowEditTargetForm } = useModal();
	const [errors, setErrors] = useState([]);
	const [companyName, setCompanyName] = useState(target.company_name);
	const [location, setLocation] = useState(target.location);
	const [description, setDescription] = useState(target.description);
	const [phone, setPhone] = useState(target.phone);
	const [website, setWebsite] = useState(target.website);
	const [status, setStatus] = useState(target.status);
	const dispatch = useDispatch();

	const onEdit = async (e) => {
		e.preventDefault();
		const newTarget = {
			id: target.id,
			company_name: companyName,
			location: location,
			description: description,
			phone: phone,
			website: website,
			status: status,
		};
		const data = await dispatch(editTarget(newTarget));
		if (data) {
			setErrors(data);
		} else {
			await dispatch(updateTargetToSession(newTarget));
			setShowEditTargetForm(false);
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
		<Modal
			title={`Edit ${target.company_name}`}
			onClose={() => {
				setShowEditTargetForm(false);
				setErrors([]);
				setCompanyName(target.company_name);
				setDescription(target.description);
				setWebsite(target.website);
				setStatus(target.status);
				setPhone(target.phone);
				setLocation(target.location);
			}}
			show={showEditTargetForm}
		>
			{errors.length > 0 && (
				<div className="form-errors">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
			)}

			<form id="modal-form" onSubmit={onEdit}>
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
						value={description}
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
				<div id="form-select">
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
				<button type="submit" id="form-submit-button">
					Edit Target
				</button>
			</form>
		</Modal>
	);
};

export default EditTargetForm;
