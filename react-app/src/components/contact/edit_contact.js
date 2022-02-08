import "./edit_contact.css";

import Modal from "../modal";
import { useState, useEffect } from "react";
import { useModal } from "../../context/modal_context";
import { useDispatch } from "react-redux";
import { editContact, removeContact } from "../../store/target";

const EditContactForm = () => {
	const { showEditContactForm, setShowEditContactForm, contact, setContact } =
		useModal();
	const [errors, setErrors] = useState([]);
	const [showDelete, setShowDelete] = useState(false);

	const [name, setName] = useState();
	const [title, setTitle] = useState();
	const [phone, setPhone] = useState();
	const [email, setEmail] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		setName(contact.name);
		setTitle(contact.title);
		setPhone(contact.phone);
		setEmail(contact.email);
	}, [contact]);

	const onEdit = async (e) => {
		e.preventDefault();
		const newContact = {
			id: contact.id,
			target_id: contact.target_id,
			name: name,
			phone: phone,
			title: title,
			email: email,
		};
		const data = await dispatch(editContact(newContact));
		if (data) {
			setErrors(data);
		} else {
			setShowEditContactForm(false);
		}
	};

	const onDelete = async (e) => {
		e.preventDefault();
		const data = await dispatch(removeContact(contact.id));
		if (data) {
			setErrors(data);
		} else {
			setShowEditContactForm(false);
		}
	};

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

	return (
		<Modal
			title={`Edit ${contact.name}`}
			onClose={() => {
				setErrors([]);
				setName(contact.name);
				setTitle(contact.title);
				setPhone(contact.phone);
				setEmail(contact.email);
				setShowEditContactForm(false);
			}}
			show={showEditContactForm}
		>
			<form onSubmit={onEdit}>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div>
					<label>Name</label>
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

				<button type="submit">Edit Contact</button>
				{showDelete ? (
					<div id="contact-delete-check">
						<p>Delete {name}?</p>
						<button
							onClick={onDelete}
						>
							Yes
						</button>
						<button onClick={() => setShowDelete(false)}>No</button>
					</div>
				) : (
					<button onClick={() => setShowDelete(true)}>Delete Contact</button>
				)}
			</form>
		</Modal>
	);
};

export default EditContactForm;
