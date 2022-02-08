const LOAD_TARGET = "target/LOAD_TARGET";
const loadTarget = (target) => ({
	type: LOAD_TARGET,
	payload: target,
});
const initialState = { target: " " };

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


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_TARGET:
			return action.payload;
		default:
			return state;
	}
}
