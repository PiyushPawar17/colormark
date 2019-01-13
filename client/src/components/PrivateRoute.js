import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
	<Route
		{...rest}
		// eslint-disable-next-line
		render={props => (user.authenticated ? <Component {...props} /> : <Redirect to="/" />)}
	/>
);

const mapStateToProps = ({ user }) => ({ user });

PrivateRoute.propTypes = {
	component: PropTypes.any.isRequired,
	user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
