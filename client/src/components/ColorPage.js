import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getColors } from '../actions/colorActions';

import ColorCard from './ColorCard';
import Loader from './Loader';
import NotFound from './NotFound';

class ColorPage extends React.Component {
	componentDidMount() {
		const { type } = this.props.match.params;
		if (type === 'swatches' || type === 'palettes' || type === 'gradients') {
			this.props.getColors(type);
		}
	}

	componentDidUpdate(prevProps) {
		const { type } = this.props.match.params;
		if (this.props.location !== prevProps.location) {
			this.props.getColors(type);
		}
	}

	render() {
		const { type } = this.props.match.params;
		const { loading } = this.props.color;

		return (
			<main className="colorpage">
				<div className="container">
					{type === 'swatches' || type === 'palettes' || type === 'gradients' ? (
						<h1 className="heading">{type}</h1>
					) : null}
					{type === 'swatches' || type === 'palettes' || type === 'gradients' ? (
						!loading ? (
							this.props.color[`${type}`].length === 0 ? (
								<div className="info">Nothing to show</div>
							) : (
								<div className="cards">
									{this.props.color[`${type}`].map((color, index) => (
										<ColorCard key={color._id} color={color} index={index} />
									))}
								</div>
							)
						) : (
							<Loader />
						)
					) : (
						<NotFound />
					)}
				</div>
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
