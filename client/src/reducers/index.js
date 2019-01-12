import { combineReducers } from 'redux';

import userReducer from './userReducer';
import colorReducer from './colorReducer';

export default combineReducers({
	user: userReducer,
	color: colorReducer
});
