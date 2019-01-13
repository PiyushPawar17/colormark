import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from './hoc/Container';
import ColorCard from './ColorCard';
import Modal from './Modal';

import LikeFilled from '../img/heart-filled.svg';

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type: ''
		};

		this.changeType = this.changeType.bind(this);
	}

	changeType(event) {
		this.setState({ type: event.target.name });
	}

	render() {
		const { user } = this.props;
		const { type } = this.state;

		return (
			<div className="profile">
				<Container>
					<h1 className="heading">{user.user.name}</h1>
					<div className="profile__buttons">
						<a href="#modal" name="swatches" className="btn btn--primary mr-big" onClick={this.changeType}>
							Create Swatch
						</a>
						<a href="#modal" name="palettes" className="btn btn--primary mr-big" onClick={this.changeType}>
							Create Palette
						</a>
						<a href="#modal" name="gradients" className="btn btn--primary mr-big" onClick={this.changeType}>
							Create Gradient
						</a>
					</div>
					{['swatches', 'palettes', 'gradients'].map(type => {
						const colorType = type === 'swatches' ? 'swatch' : type.substring(0, type.length - 1);
						return (
							<React.Fragment key={type}>
								<h1 className="heading">
									<img src={LikeFilled} alt="Liked" />
									Liked {type}
								</h1>
								<div className="cards">
									{user.user.favorites.map((color, index) =>
										color.type === colorType ? (
											<ColorCard key={color._id} color={color} index={index} />
										) : null
									)}
								</div>
							</React.Fragment>
						);
					})}
					<Modal type={type} />
				</Container>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

Profile.propTypes = {
	user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Profile);
