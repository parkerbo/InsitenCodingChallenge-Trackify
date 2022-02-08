import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
	const [showEditTargetForm, setShowEditTargetForm] = useState(false);
    const [showEditContactForm, setShowEditContactForm] = useState(false);
    const [showAddContactForm, setShowAddContactForm] = useState(false);
    const [contact, setContact] = useState("");

	return (
		<ModalContext.Provider
			value={{
				showEditTargetForm,
				setShowEditTargetForm,
                showEditContactForm,
                setShowEditContactForm,
                showAddContactForm,
                setShowAddContactForm,
                contact,
                setContact
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
