import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from './hoc/Container';

import Logo from '../img/logo-big.svg';

const Navbar = props => (
	<nav className="navbar">
		<Container>
			<div className="navbar__container">
				<Link className="navbar__link" to="/swatches">
					<img src={Logo} alt="Logo" className="navbar__logo" />
				</Link>
				<div className="navbar__links">
					<Link to="/swatches" className="navbar__link">
						Swatches
					</Link>
					<Link to="/palettes" className="navbar__link">
						Palettes
					</Link>
					<Link to="/gradients" className="navbar__link">
						Gradients
					</Link>
					<Link to="/me" className="navbar__link">
						Profile
					</Link>
					{props.user.authenticated ? (
						<a href="/auth/logout">Sign Out</a>
					) : (
						<a href="/auth/google">Sign In</a>
					)}
				</div>
			</div>
		</Container>
	</nav>
);

Navbar.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Navbar);
