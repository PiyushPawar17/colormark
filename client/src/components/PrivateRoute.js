import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		// eslint-disable-next-line
		render={props => (auth.authenticated ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
);

const mapStateToProps = ({ auth }) => ({ auth });

PrivateRoute.propTypes = {
	component: PropTypes.any.isRequired,
	auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
