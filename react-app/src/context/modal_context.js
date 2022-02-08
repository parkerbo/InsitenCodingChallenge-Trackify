import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
	const [showEditTargetForm, setShowEditTargetForm] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				showEditTargetForm,
				setShowEditTargetForm,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
