import axios from 'axios';

import { userTypes } from '../constants';

// --- Requests for GET Routes ---

export const getUser = () => async dispatch => {
	const res = await axios.get('/api/users/me');
	dispatch({ type: userTypes.GET_USER, payload: res.data });
};
