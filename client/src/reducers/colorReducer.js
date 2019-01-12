import { colorTypes } from '../constants';

const initialState = {
	swatches: [],
	palettes: [],
	gradients: [],
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case colorTypes.GET_SWATCHES:
			return {
				...state,
				swatches: [...action.payload.colors],
				loading: false
			};
		case colorTypes.GET_PALETTES:
			return {
				...state,
				palettes: [...action.payload.colors],
				loading: false
			};
		case colorTypes.GET_GRADIENTS:
			return {
				...state,
				gradients: [...action.payload.colors],
				loading: false
			};
		case colorTypes.COLOR_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
