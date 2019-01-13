import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { addToFavorites, removeFromFavorites } from '../actions/userActions';

import LikeOutlined from '../img/heart-outlined.svg';
import LikeFilled from '../img/heart-filled.svg';

const ColorCardWrapper = styled.div`
	border-radius: 5px;
	box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.2);
	padding: 2rem;
	margin-right: 2%;
	margin-bottom: 10rem;
	flex: 0 1 18%;
	animation: moveInBottom 0.3s ease-in-out;
	animation-delay: ${props => props.index / 5}s;
	animation-fill-mode: backwards;
`;

const ColorCardColors = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	height: 17rem;
	overflow: hidden;
`;

const ColorCardColor = styled.div`
	position: relative;
	height: 100%;
	justify-content: stretch;
	background-image: ${props =>
		props.type === 'gradient' && `linear-gradient(to bottom, ${props.color1}, ${props.color2})`};
	background-color: ${props => (props.type === 'swatch' || props.type === 'palette') && props.color};
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&::before {
		content: '${props => (props.type === 'gradient' && props.color1) || props.color}';
		position: absolute;
		top: 1rem;
		left: 1rem;
		background-color: rgba(0, 0, 0, 0.15);
		padding: 4px 8px;
		font-size: 1.2rem;
		color: #ffffff;
		border-radius: 3px;
		transform: translateX(-4rem);
		transition: all 0.3s ease-in-out;
		opacity: 0;
	}

	&::after {
		content: '${props => props.type === 'gradient' && props.color2}';
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		background-color: ${props => props.type === 'gradient' && `rgba(0, 0, 0, 0.15)`};
		padding: 4px 8px;
		font-size: 1.2rem;
		color: #ffffff;
		border-radius: 3px;
		transform: translateX(4rem);
		transition: all 0.3s ease-in-out;
		opacity: 0;
	}

	&:hover::before,
	&:hover::after {
		transform: translateX(0);
		opacity: 1;
	}
`;

class ColorCard extends React.Component {
	constructor(props) {
		super(props);

		this.addToFavorites = this.addToFavorites.bind(this);
		this.removeFromFavorites = this.removeFromFavorites.bind(this);
	}

	addToFavorites() {
		if (this.props.user.authenticated) {
			this.props.addToFavorites(this.props.color._id);
		}
	}

	removeFromFavorites() {
		if (this.props.user.authenticated) {
			this.props.removeFromFavorites(this.props.color._id);
		}
	}

	render() {
		const { color, index, user } = this.props;

		let liked;
		if (!user.authenticated) {
			liked = false;
		} else {
			liked = color.likes.filter(like => like === user.user._id).length !== 0;
		}

		return (
			<ColorCardWrapper index={index}>
				<ColorCardColors>
					{color.type === 'gradient' ? (
						<ColorCardColor type={color.type} color1={color.colors[0]} color2={color.colors[1]} />
					) : (
						color.colors.map((currentColor, index) => (
							<ColorCardColor key={index} type={color.type} color={currentColor} />
						))
					)}
				</ColorCardColors>
				<div className="color-card__like">
					{!liked ? (
						<img src={LikeOutlined} alt="Like" onClick={this.addToFavorites} />
					) : (
						<img src={LikeFilled} alt="Like" onClick={this.removeFromFavorites} />
					)}
					<span>{color.likes.length}</span>
				</div>
			</ColorCardWrapper>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

ColorCard.propTypes = {
	color: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	addToFavorites: PropTypes.func.isRequired,
	removeFromFavorites: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ addToFavorites, removeFromFavorites }
)(ColorCard);
