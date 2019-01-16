import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import ClipboardJS from 'clipboard';
import PropTypes from 'prop-types';

import { addToFavorites, removeFromFavorites } from '../actions/userActions';

import LikeOutlined from '../img/heart-outlined.svg';
import LikeFilled from '../img/heart-filled.svg';

import 'tippy.js/dist/tippy.css';

const ColorCardWrapper = styled.div`
	border-radius: 5px;
	box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.2);
	padding: 2rem;
	margin-right: 2%;
	margin-bottom: 10rem;
	flex: 0 1 18%;
	outline: none;
	animation: moveInBottom 0.3s ease-in-out;
	animation-delay: ${props => props.index / 10}s;
	animation-fill-mode: backwards;

	@media screen and (max-width: 1200px) {
		flex: 0 1 23%;
		margin-right: 2%;
	}

	@media screen and (max-width: 950px) {
		flex: 0 1 31%;
		margin-right: 2%;
	}

	@media screen and (max-width: 700px) {
		flex: 0 1 46%;
		margin-right: 4%;
	}

	@media screen and (max-width: 500px) {
		flex: 0 1 75%;
		margin: 0 auto;
		margin-bottom: 2rem;
	}

	@media screen and (max-width: 375px) {
		flex: 0 1 90%;
	}
`;

const ColorCardColors = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	height: 17rem;
	overflow: hidden;
	outline: none;

	@media screen and (max-width: 700px) {
		height: 20rem;
	}
`;

const ColorCardColor = styled.div`
	position: relative;
	height: 100%;
	justify-content: stretch;
	background-image: ${props =>
		props.type === 'gradient' && `linear-gradient(to bottom, ${props.color1}, ${props.color2})`};
	background-color: ${props => (props.type === 'swatch' || props.type === 'palette') && props.color};
	outline: none;
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

		this.card1 = React.createRef();
		this.card2 = React.createRef();
		this.card3 = React.createRef();
		this.card4 = React.createRef();
		this.tip = React.createRef();

		this.addToFavorites = this.addToFavorites.bind(this);
		this.removeFromFavorites = this.removeFromFavorites.bind(this);
		this.click = this.click.bind(this);
		this.hide = this.hide.bind(this);
	}

	componentDidMount() {
		new ClipboardJS(this.card1.current);

		if (this.props.color.type === 'palette') {
			new ClipboardJS(this.card2.current);
			new ClipboardJS(this.card3.current);
			new ClipboardJS(this.card4.current);
		}
	}

	click() {
		this.tip.current.tip.setContent('Copied!');
		this.tip.current.tip.show();
	}

	hide() {
		this.tip.current.tip.setContent('Click to copy');
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
			<Tippy content="Click to copy" ref={this.tip} onHidden={this.hide}>
				<ColorCardWrapper index={index}>
					<ColorCardColors>
						{color.type === 'gradient' ? (
							<ColorCardColor
								type={color.type}
								color1={color.colors[0]}
								color2={color.colors[1]}
								ref={this.card1}
								data-clipboard-text={`${color.colors[0]} ${color.colors[1]}`}
								onClick={this.click}
							/>
						) : (
							color.colors.map((currentColor, index) => (
								<ColorCardColor
									key={index}
									type={color.type}
									color={currentColor}
									ref={this[`card${index + 1}`]}
									data-clipboard-text={currentColor}
									onClick={this.click}
								/>
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
			</Tippy>
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
