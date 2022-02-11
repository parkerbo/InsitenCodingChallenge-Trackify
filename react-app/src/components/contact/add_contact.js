import Modal from "../modal";
import { useState } from "react";
import { useModal } from "../../context/modal_context";
import { newContact } from "../../store/target";
import { useDispatch } from "react-redux";

const AddContact = ({ targetId }) => {
	const { showAddContactForm, setShowAddContactForm } = useModal();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
    const dispatch = useDispatch();

	const updateName = (e) => {
		setName(e.target.value);
	};

	const updateTitle = (e) => {
		setTitle(e.target.value);
	};

	const updatePhone = (e) => {
		setPhone(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const onAdd = async (e) => {
		e.preventDefault();
		const contact = {
			target_id: targetId,
			name: name,
			phone: phone,
			title: title,
			email: email,
		};
		const data = await dispatch(newContact(contact));
		if (data) {
			setErrors(data);
		} else {
			setName("")
			setTitle("")
			setPhone("")
			setEmail("")
			setShowAddContactForm(false);
		}
	};

	return (
		<Modal
			title={`Add a new contact`}
			onClose={() => {
				setErrors([]);
				setName("");
				setTitle("");
				setPhone("");
				setEmail("");
				setShowAddContactForm(false);
			}}
			show={showAddContactForm}
		>
			<form id="modal-form" onSubmit={onAdd}>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div>
					<label>Name <span id="form-required">(required)</span></label>
					<input
						type="text"
						name="name"
						onChange={updateName}
						value={name || ""}
						required={true}
					></input>
				</div>
				<div>
					<label>Title</label>
					<input
						type="text"
						name="title"
						onChange={updateTitle}
						value={title || ""}
					></input>
				</div>
				<div>
					<label>Email</label>
					<input
						type="email"
						name="email"
						onChange={updateEmail}
						value={email || ""}
					></input>
				</div>
				<div>
					<label>Phone</label>
					<input
						type="text"
						name="phone"
						onChange={updatePhone}
						value={phone || ""}
					></input>
				</div>

				<button type="submit" id="form-submit-button">Add Contact</button>
			</form>
		</Modal>
	);
};

export default AddContact;
