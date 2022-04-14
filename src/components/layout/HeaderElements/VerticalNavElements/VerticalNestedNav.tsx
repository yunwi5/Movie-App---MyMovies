import React, { Fragment, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { GenreList, productionCompanyList } from '../../../../models/Movie';
import VerticalNavModal from './NavModal';

const genreListNoOthers = GenreList.slice(0, GenreList.length - 1);

enum NavOption {
	GENRE = 'Genres',
	PRODUCTION_COMPANY = 'Production Companies',
}

const genreNavList = genreListNoOthers.map((genre) => ({
	name: genre,
	link: `/movie-store/genre/${genre}`,
}));
const producerNavList = productionCompanyList.map((company) => ({
	name: company,
	link: `/movie-store/producer/${company}`,
}));

const VerticalNestedNav: React.FC<{ onCloseDropdown: () => void }> = ({ onCloseDropdown }) => {
	const [ showInnerNav, setShowInnerNav ] = useState<boolean>(false);
	const [ navOption, setNavOption ] = useState<NavOption | null>(null);
	const [ navList, setNavList ] = useState<Array<{ name: string; link: string }> | null>(null);

	const navOptionHandler = useCallback((option: NavOption | null) => {
		setNavOption(option);
		if (option === NavOption.GENRE) setNavList(genreNavList);
		else if (option === NavOption.PRODUCTION_COMPANY) setNavList(producerNavList);
		else setNavList(null);
	}, []);

	const navigateHandler = useCallback(
		() => {
			navOptionHandler(null);
			setShowInnerNav(false);
			onCloseDropdown();
		},
		[ navOptionHandler, onCloseDropdown ],
	);

	return (
		<Fragment>
			{navOption &&
			navList && (
				<VerticalNavModal heading={navOption} navList={navList} onClose={navigateHandler} />
			)}
			<ul className='nav-front'>
				<li className='nav-front__categories nav-main-item'>
					<NavLink
						className={(navData) =>
							navData.isActive ? 'nav-item nav-active' : 'nav-item'}
						to='/movie-store'
					>
						<i className='fa fa-shopping-bag' />
						<span className='nav-item' onClick={() => setShowInnerNav((prev) => !prev)}>
							<span className='nav-inner-text'>Movie&nbsp;</span>
							Store
						</span>
					</NavLink>
					{/* 1st (level 1) Nested navigation for browsing movies */}
					<ul className={`nested-nav ${showInnerNav ? 'show-nested-nav' : ''}`}>
						<li className='nested-nav__item'>
							<Link to='/movie-store' className='nested-nav__link'>
								<span>Browse Our Store</span> <i className='fa fa-angle-right' />
							</Link>
						</li>
						<li className='nested-nav__item genre-nav'>
							<Link to='/movie-store' className='nested-nav__link'>
								<div onClick={navOptionHandler.bind(null, NavOption.GENRE)}>
									<span>Browse By Genre</span>
									<i className='fa fa-angle-right' />
								</div>
							</Link>
						</li>
						<li className='nested-nav__item company-nav'>
							<Link to='/movie-store' className='nested-nav__link'>
								<div
									onClick={navOptionHandler.bind(
										null,
										NavOption.PRODUCTION_COMPANY,
									)}
								>
									<span>Browse By Compnay</span>
									<i className='fa fa-angle-right' />
								</div>
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</Fragment>
	);
};

export default VerticalNestedNav;
