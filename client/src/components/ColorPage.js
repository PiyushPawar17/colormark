import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getColors } from '../actions/colorActions';

import Container from './hoc/Container';
import ColorCard from './ColorCard';

class ColorPage extends React.Component {
	componentDidMount() {
		this.props.getColors(this.props.match.params.type);
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.props.getColors(this.props.match.params.type);
		}
	}

	render() {
		const { type } = this.props.match.params;
		const { loading } = this.props.color;

		return (
			<main className="colorpage">
				<Container>
					{!loading ? (
						<div>
							<h1 className="heading">{type}</h1>
							<div className="colorpage__cards">
								{this.props.color[`${type}`].map(color => (
									<ColorCard key={color._id} color={color} />
								))}
							</div>
						</div>
					) : (
						<div>Loading</div>
					)}
				</Container>
			</main>
		);
	}
}

const mapStateToProps = ({ color }) => ({ color });

ColorPage.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	color: PropTypes.object.isRequired,
	getColors: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ getColors }
)(ColorPage);
