import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getUser } from '../actions/userActions';

import store from '../store';

import Navbar from './Navbar';
import HomePage from './HomePage';
import Profile from './Profile';
import ColorPage from './ColorPage';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

import '../sass/main.scss';

class App extends React.Component {
	componentDidMount() {
		store.dispatch(getUser());
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/:type" component={ColorPage} />
							<PrivateRoute exact path="/profile/me" component={Profile} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
