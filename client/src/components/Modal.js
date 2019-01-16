import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { addColor } from '../actions/colorActions';

const ModalFullPage = styled.div.attrs(props => ({
	id: props.id
}))`
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.2);
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s ease-in-out;

	&:target {
		opacity: 1;
		visibility: visible;
	}
`;

const ModalWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	height: 75vh;
	width: 80vw;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 5px;
	box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
	overflow: auto;
`;

const ModalContent = styled.div`
	width: 75%;
`;

const ModalCloseButton = styled.a.attrs(props => ({
	href: props.href
}))`
	position: absolute;
	top: 2.5rem;
	right: 5rem;
	color: #5f5f5f;
	font-size: 4rem;
	font-weight: 200;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		color: #0ea5e6;
	}
`;

const ModalHeading = styled.div`
	font-size: 3rem;
	font-weight: 300;
	color: #0ea5e6;
	text-transform: capitalize;
	margin: 5rem 0;
`;

const ModalData = styled.div`
	display: flex;

	@media screen and (max-width: 650px) {
		flex-direction: column;
	}
`;

const ModalDataContent = styled.div`
	flex: 0 0 50%;

	@media screen and (max-width: 650px) {
		flex: 0 0 80%;
		margin: 0 auto;
		margin-bottom: 5rem;
	}
`;

const ModalColorsPreview = styled.div`
	display: flex;
	flex-direction: column;
	width: 19rem;
	height: 20rem;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
`;

const ModalColorPreview = styled.div`
	position: relative;
	height: 100%;
	justify-content: stretch;
	background-image: ${props =>
		props.type === 'gradient' && `linear-gradient(to bottom, ${props.color1}, ${props.color2})`};
	background-color: ${props => (props.type === 'swatch' || props.type === 'palette') && props.color};
	cursor: pointer;
	transition: all 0.3s ease-in-out;
`;

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			colors: ['', '', '', '']
		};

		this.onChange = this.onChange.bind(this);
		this.save = this.save.bind(this);
	}

	onChange(event) {
		let { colors } = this.state;
		colors[event.target.name] = event.target.value;

		this.setState({ colors });
	}

	save() {
		const { colors } = this.state;
		const { type } = this.props;
		const colorType = type === 'swatches' ? 'swatch' : type.substring(0, type.length - 1);
		const currentColors = colors.map(color => (color === '' ? '#FFFFFF' : color));
		const color = {};
		color.type = colorType;

		if (colorType === 'swatch') {
			color.colors = [currentColors[0]];
		} else if (colorType === 'gradient') {
			color.colors = [currentColors[0], currentColors[1]];
		} else {
			color.colors = [...currentColors];
		}

		this.props.addColor(color);

		const resetcolors = ['', '', '', ''];
		this.setState({ colors: resetcolors });
	}

	render() {
		const { type } = this.props;
		const { colors } = this.state;
		const colorType = type === 'swatches' ? 'swatch' : type.substring(0, type.length - 1);
		const currentColors = colors.map(color => (color === '' ? '#FFFFFF' : color));

		return (
			<ModalFullPage id="modal">
				<ModalWrapper>
					<ModalContent>
						<ModalCloseButton href="#">&times;</ModalCloseButton>
						<ModalHeading>New {colorType}</ModalHeading>
						<ModalData>
							<ModalDataContent>
								<div className="heading--secondary">Preview</div>
								<ModalColorsPreview>
									{colorType === 'swatch' ? (
										<ModalColorPreview color={currentColors[0]} type={colorType} />
									) : colorType === 'gradient' ? (
										<ModalColorPreview
											color1={currentColors[0]}
											color2={currentColors[1]}
											type={colorType}
										/>
									) : (
										currentColors.map((color, index) => (
											<ModalColorPreview key={index} color={color} type={colorType} />
										))
									)}
								</ModalColorsPreview>
								<div className="modal__buttons">
									<a href="#" className="btn btn--primary mr-medium" onClick={this.save}>
										Save
									</a>
									<a href="#" className="btn">
										Cancel
									</a>
								</div>
							</ModalDataContent>
							<ModalDataContent>
								<div className="modal__label">Color 1 Hex Code</div>
								<input
									name="0"
									className="modal__input"
									value={this.state.colors[0]}
									onChange={this.onChange}
									type="text"
								/>
								{type === 'gradients' || type === 'palettes' ? (
									<React.Fragment>
										<div className="modal__label">Color 2 Hex Code</div>
										<input
											name="1"
											className="modal__input"
											value={this.state.colors[1]}
											onChange={this.onChange}
											type="text"
										/>
									</React.Fragment>
								) : null}
								{type === 'palettes' ? (
									<React.Fragment>
										<div className="modal__label">Color 3 Hex Code</div>
										<input
											name="2"
											className="modal__input"
											value={this.state.colors[2]}
											onChange={this.onChange}
											type="text"
										/>
										<div className="modal__label">Color 4 Hex Code</div>
										<input
											name="3"
											className="modal__input"
											value={this.state.colors[3]}
											onChange={this.onChange}
											type="text"
										/>
									</React.Fragment>
								) : null}
							</ModalDataContent>
						</ModalData>
					</ModalContent>
				</ModalWrapper>
			</ModalFullPage>
		);
	}
}

Modal.propTypes = {
	type: PropTypes.string.isRequired,
	addColor: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addColor }
)(Modal);
