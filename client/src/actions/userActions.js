import axios from 'axios';

import { userTypes, colorTypes } from '../constants';

// --- Requests for GET Routes ---

export const getUser = () => async dispatch => {
	const res = await axios.get('/api/users/me');
	dispatch({ type: userTypes.GET_USER, payload: res.data });
};

// --- Requests for POST Routes ---

export const addToFavorites = colorId => async dispatch => {
	const res = await axios.post(`/api/users/favorite/${colorId}`);
	dispatch({ type: userTypes.UPDATE_USER, payload: res.data });

	const colorType = res.data.color.type === 'swatch' ? 'swatches' : `${res.data.color.type}s`;
	const payload = {
		color: res.data.color,
		colorType
	};
	dispatch({ type: colorTypes.UPDATE_COLOR, payload });
};

// --- Requests for DELETE Routes ---

export const removeFromFavorites = colorId => async dispatch => {
	const res = await axios.delete(`/api/users/favorite/${colorId}`);
	dispatch({ type: userTypes.UPDATE_USER, payload: res.data });

	const colorType = res.data.color.type === 'swatch' ? 'swatches' : `${res.data.color.type}s`;
	const payload = {
		color: res.data.color,
		colorType
	};
	dispatch({ type: colorTypes.UPDATE_COLOR, payload });
};
