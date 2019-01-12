import axios from 'axios';

import { colorTypes } from '../constants';

// --- Requests for GET Routes ---

export const getColors = colorType => async dispatch => {
	dispatch(loading());

	const res = await axios.get(`/api/colors/${colorType}`);
	const type =
		colorType === 'swatches'
			? colorTypes.GET_SWATCHES
			: colorType === 'palettes'
				? colorTypes.GET_PALETTES
				: colorTypes.GET_GRADIENTS;

	dispatch({ type, payload: res.data });
};

// --- Other Actions ---

export const loading = () => ({ type: colorTypes.COLOR_LOADING });
