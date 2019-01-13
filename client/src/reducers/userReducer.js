import { userTypes } from '../constants';

import isEmpty from '../utils/isEmpty';

const initialState = {
	user: null,
	authenticated: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case userTypes.GET_USER:
			return {
				...state,
				user: action.payload.user,
				authenticated: !isEmpty(action.payload.user)
			};
		case userTypes.UPDATE_USER:
			return {
				...state,
				user: action.payload.user
			};
		default:
			return state;
	}
};
