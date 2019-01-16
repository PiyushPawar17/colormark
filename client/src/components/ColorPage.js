import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import PropTypes from 'prop-types';

import { getColors } from '../actions/colorActions';

import ColorCard from './ColorCard';
import NewColorCard from './NewColorCard';
import Loader from './Loader';
import NotFound from './NotFound';

class ColorPage extends React.Component {
	constructor(props) {
		super(props);

		this.create = this.create.bind(this);
	}

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

	create() {
		if (this.props.user.authenticated) {
			this.props.history.push('/profile/me');
		} else {
			toast.info('You need to login to create new color', {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				className: 'toast'
			});
		}
	}

	render() {
		const { type } = this.props.match.params;
		const { loading } = this.props.color;
		const colorType = type === 'swatches' ? 'swatch' : type.substring(0, type.length - 1);

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
									<NewColorCard onClick={this.create} index={this.props.color[`${type}`].length}>
										Create New {colorType}
									</NewColorCard>
								</div>
							)
						) : (
							<Loader />
						)
					) : (
						<NotFound />
					)}
				</div>
				<ToastContainer transition={Zoom} />
			</main>
		);
	}
}

const mapStateToProps = ({ user, color }) => ({ user, color });

ColorPage.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	color: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	getColors: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ getColors }
)(ColorPage);
