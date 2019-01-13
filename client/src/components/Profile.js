import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from './hoc/Container';
import ColorCard from './ColorCard';

import LikeFilled from '../img/heart-filled.svg';

const Profile = ({ user }) => (
	<div className="profile">
		<Container>
			<h1 className="heading">{user.user.name}</h1>
			<div className="profile__buttons">
				<button className="btn btn--primary mr-big">Create Swatch</button>
				<button className="btn btn--primary mr-big">Create Palette</button>
				<button className="btn btn--primary mr-big">Create Gradient</button>
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
							{user.user.favorites.map(color =>
								color.type === colorType ? <ColorCard key={color._id} color={color} /> : null
							)}
						</div>
					</React.Fragment>
				);
			})}
		</Container>
	</div>
);

const mapStateToProps = ({ user }) => ({ user });

Profile.propTypes = {
	user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Profile);
