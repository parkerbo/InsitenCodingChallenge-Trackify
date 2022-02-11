import "./contact.css";
import { useState } from "react";
import { useModal } from "../../context/modal_context";

const Contact = ({ contact }) => {
    const { setShowEditContactForm, setContact } = useModal();
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div className="contact-list">
			<div className="widget-row" onClick={() => setShowDetails(!showDetails)}>
				<div id="contact-row-title">{contact.name}</div>
				<div id="contact-row-value">{contact.title}</div>
				<div className="contact-options">
					<button
						id="contact-button"
						onClick={(e) => {
							e.stopPropagation();
							setContact(contact);
							setShowEditContactForm(true);
						}}
					>
						Edit
					</button>
					<button id='contact-button'>Details</button>
				</div>
			</div>
			{showDetails && (
				<div className="contact-details">
					<div className="widget-row">
						<div id="widget-row-title">Phone</div>
						<div id="widget-row-value">{contact.phone || "---"}</div>
					</div>
					<div className="widget-row">
						<div id="widget-row-title">Email</div>
						<div id="widget-row-value">
							{contact.email ? (
								<a href={`mailto:${contact.email}`}>{contact.email}</a>
							) : (
								"---"
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Contact;
