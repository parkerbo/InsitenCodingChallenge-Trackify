import "./edit_target.css"

import Modal from "../modal"
import { useState } from "react"
import { useModal } from "../../context/modal_context"
import { useDispatch } from "react-redux"
import { editTarget } from "../../store/target"

const EditTargetForm = ({target}) => {
    const {showEditTargetForm, setShowEditTargetForm} = useModal();
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
                status: status
            }
				const data = await dispatch(editTarget(newTarget));
				if (data) {
					setErrors(data);
				} else {
                    setShowEditTargetForm(false)
                }

		};

    const updateCompanyName = (e) => {
        setCompanyName(e.target.value);
    }

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
            onClose={() => setShowEditTargetForm(false)}
            show={showEditTargetForm}>
				<form onSubmit={onEdit}>
					<div>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<div>
						<label>Company Name</label>
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
					<div>
						<label>Status</label>
						<select name="status" onChange={updateStatus} value={status}>
							<option>Researching</option>
							<option>Pending Approval</option>
							<option>Approved</option>
							<option>Declined</option>
						</select>
					</div>
					<button type="submit" >Edit Target</button>
				</form>
			</Modal>
		);
}

export default EditTargetForm;
