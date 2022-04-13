import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { removeInvalidSearchCharacters } from '../../utilities/string-util';
import { NavList, StoreNestedNav, VerticalNavList, SearchbarContainer } from './HeaderElements';

const Header: React.FC = () => {
	const [ isSearching, setIsSearching ] = useState(false);
	const navigate = useNavigate();

	const searchHandler = (searchWord: string) => {
		const validSearchWord = removeInvalidSearchCharacters(searchWord);
		navigate(`/store-movies?search=${validSearchWord}`, { replace: false });
	};

	return (
		<header className={`header`}>
			<h3 className={isSearching ? 'hide-header' : ''}>
				<NavLink
					to='/home'
					className={(navData) =>
						navData.isActive ? 'heading heading-active' : 'heading'}
				>
					<span>MyMovies</span>
				</NavLink>
			</h3>
			<div className='nested-nav-wrapper'>
				<StoreNestedNav />
			</div>
			<SearchbarContainer
				onSearch={searchHandler}
				onShowSearch={(show: boolean) => setIsSearching(show)}
				isSearching={isSearching}
			/>
			<div className='nav-item-list-wrapper'>
				<NavList />
			</div>
			<VerticalNavList />
		</header>
	);
};

export default Header;
