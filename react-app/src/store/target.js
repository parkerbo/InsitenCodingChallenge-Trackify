const LOAD_TARGET = "target/LOAD_TARGET";
const UPDATE_TARGET = "target/UPDATE_TARGET";
const UPDATE_NOTES = "target/UPDATE_NOTES";
const loadTarget = (target) => ({
	type: LOAD_TARGET,
	payload: target,
});

const updateTarget = (target) => ({
	type: UPDATE_TARGET,
	payload: target,
});

const updateNotes = (notes) => ({
	type: UPDATE_NOTES,
	payload: notes,
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
    const newState = {...state}
	switch (action.type) {
		case LOAD_TARGET:
			return action.payload;
        case UPDATE_TARGET:
            newState.target = action.payload;
            return newState;
        case UPDATE_NOTES:
            newState.target.notes = action.payload;
            return newState;
		default:
			return state;
	}
}
