import React from 'react';
import ReactLoader from 'react-loaders';

const Loader = props => (
	<div className="loader">
		<ReactLoader type="ball-scale-ripple-multiple" />
	</div>
);

export default Loader;
