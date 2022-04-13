import React, { useState } from 'react';

import {
	NavList,
	StoreNestedNav,
	VerticalNavList,
	SearchbarContainer,
	HeaderTitle,
} from './HeaderElements';

const Header: React.FC = () => {
	const [ isSearching, setIsSearching ] = useState(false);

	return (
		<header className={`header`}>
			<HeaderTitle isSearching={isSearching} />
			<div className='nested-nav-wrapper'>
				<StoreNestedNav />
			</div>
			<SearchbarContainer
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
