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
		case colorTypes.ADD_SWATCHES:
			return {
				...state,
				swatches: [...state.swatches, action.payload.color]
			};
		case colorTypes.ADD_PALETTES:
			return {
				...state,
				palettes: [...state.palettes, action.payload.color]
			};
		case colorTypes.ADD_GRADIENTS:
			return {
				...state,
				gradients: [...state.gradients, action.payload.color]
			};
		case colorTypes.UPDATE_COLOR:
			if (action.payload.colorType === 'swatches') {
				const swatches = state.swatches.map(swatch =>
					action.payload.color._id === swatch._id ? action.payload.color : swatch
				);
				return {
					...state,
					swatches
				};
			} else if (action.payload.colorType === 'palettes') {
				const palettes = state.palettes.map(palette =>
					action.payload.color._id === palette._id ? action.payload.color : palette
				);
				return {
					...state,
					palettes
				};
			} else {
				const gradients = state.gradients.map(gradient =>
					action.payload.color._id === gradient._id ? action.payload.color : gradient
				);
				return {
					...state,
					gradients
				};
			}
		case colorTypes.COLOR_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
