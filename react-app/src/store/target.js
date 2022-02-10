import { deleteTarget } from "./session";

const LOAD_TARGET = "target/LOAD_TARGET";
const UPDATE_TARGET = "target/UPDATE_TARGET";

const UPDATE_NOTES = "target/UPDATE_NOTES";

const ADD_CONTACT = "target/ADD_CONTACT";
const UPDATE_CONTACT = "target/UPDATE_CONTACT";
const DELETE_CONTACT = "target/DELETE_CONTACT";

const UPDATE_FINANCE = "target/UPDATE_FINANCE";

const loadTarget = (target) => ({
	type: LOAD_TARGET,
	payload: target,
});

const updateTarget = (target) => ({
	type: UPDATE_TARGET,
	payload: target,
});

const addContact = (contact) => ({
	type: ADD_CONTACT,
	payload: contact,
});

const updateContact = (contact) => ({
	type: UPDATE_CONTACT,
	payload: contact,
});

const deleteContact = (contact) => ({
	type: DELETE_CONTACT,
	payload: contact,
});

const updateNotes = (notes) => ({
	type: UPDATE_NOTES,
	payload: notes,
});

const updateFinance = (finance) => ({
	type: UPDATE_FINANCE,
	payload: finance,
});

const initialState = null;

export const getTarget = (targetId) => async (dispatch) => {
	const response = await fetch(`/api/targets/${targetId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadTarget(data));
		return data;
	} else {
		return response;
	}
};

export const addTarget = (target) => async (dispatch) => {
	const response = await fetch(`/api/targets/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			company_name: target.company_name,
			description: target.description,
			location: target.location,
			website: target.website,
			status: target.status,
			phone: target.phone,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editTarget = (target) => async (dispatch) => {
	const response = await fetch(`/api/targets/${target.id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			company_name: target.company_name,
			description: target.description,
			location: target.location,
			website: target.website,
			status: target.status,
			phone: target.phone,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateTarget(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const removeTarget = (targetId) => async (dispatch) => {
	const response = await fetch(`/api/targets/${targetId}/delete`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteTarget(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const newContact = (contact) => async (dispatch) => {
	const response = await fetch(`/api/contacts/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			target_id: contact.target_id,
			name: contact.name,
			title: contact.title,
			email: contact.email,
			phone: contact.phone,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addContact(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editContact = (contact) => async (dispatch) => {
	const response = await fetch(`/api/contacts/${contact.id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: contact.name,
			title: contact.title,
			email: contact.email,
			phone: contact.phone,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateContact(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editFinance = (finance) => async (dispatch) => {
	const response = await fetch(`/api/finances/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: finance.id,
			target_id: finance.target_id,
			avgVolume: finance.avgVolume,
			peRatio: finance.peRatio,
			YTDhigh: finance.YTDhigh,
			YTDlow: finance.YTDlow,
			netProScore: finance.netProScore,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateFinance(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const removeContact = (contactId) => async (dispatch) => {
	const response = await fetch(`/api/contacts/${contactId}/delete`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteContact(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const saveNotes = (notes) => async (dispatch) => {
	const response = await fetch(`/api/targets/${notes.targetId}/notes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(notes),
	});

	if (response.ok) {
		dispatch(updateNotes(notes.notes));
		return notes.notes;
	} else {
		return response;
	}
};

export default function reducer(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case LOAD_TARGET:
			return action.payload;
		case UPDATE_TARGET:
			newState.target = action.payload;
			return newState;
		case ADD_CONTACT:
			newState.contacts[action.payload.id] = action.payload;
			return newState;
		case UPDATE_CONTACT:
			newState.contacts[action.payload.id] = action.payload;
			return newState;
		case DELETE_CONTACT:
			delete newState.contacts[action.payload.id];
			return newState;
		case UPDATE_NOTES:
			newState.target.notes = action.payload;
			return newState;
		case UPDATE_FINANCE:
			newState.financials = action.payload;
			return newState;
		default:
			return state;
	}
}
