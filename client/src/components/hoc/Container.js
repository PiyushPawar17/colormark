import React from 'react';
import PropTypes from 'prop-types';

const Container = props => <div className="container">{props.children}</div>;

Container.propTypes = {
	children: PropTypes.any.isRequired
};

export default Container;
