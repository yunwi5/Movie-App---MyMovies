import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderTitle: React.FC<{ isSearching: boolean }> = ({ isSearching }) => {
	return (
		<h3 className={isSearching ? 'hide-header' : ''}>
			<NavLink
				to='/home'
				className={(navData) => (navData.isActive ? 'heading heading-active' : 'heading')}
			>
				<span>MyMovies</span>
			</NavLink>
		</h3>
	);
};

export default HeaderTitle;
