import React from 'react';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.history.push('/swatches');
	}

	render() {
		return null;
	}
}

HomePage.propTypes = {
	history: PropTypes.object.isRequired
};

export default HomePage;
