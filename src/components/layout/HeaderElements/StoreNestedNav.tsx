import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { GenreList, productionCompanyList } from '../../../models/Movie';

const genreListNoOthers = GenreList.slice(0, GenreList.length - 1);

const StoreNestedNav: React.FC = () => {
	return (
		<ul className='nav-front'>
			<li className='nav-front__categories nav-main-item'>
				<NavLink
					className={(navData) => (navData.isActive ? 'nav-item nav-active' : 'nav-item')}
					to='/movie-store'
				>
					<i className='fa fa-shopping-bag' />
					<span className='nav-item'>
						<span className='nav-inner-text'>Movie</span>
						Store
					</span>
				</NavLink>
				{/* 1st (level 1) Nested navigation for browsing movies */}
				<ul className='nested-nav'>
					<li className='nested-nav__item'>
						<Link to='/movie-store' className='nested-nav__link'>
							<span>Browse Our Store</span> <i className='fa fa-angle-right' />
						</Link>
					</li>
					<li className='nested-nav__item genre-nav'>
						<Link to='/movie-store' className='nested-nav__link'>
							<span>Browse By Genre</span> <i className='fa fa-angle-right' />
						</Link>
						{/* 2nd Nested (level 2) Navigation For Browsing Movie Genres */}
						<ul className='nested-nested-nav'>
							{genreListNoOthers.map((genre, idx) => (
								<li className='nested-nav__item' key={idx}>
									<Link
										className='nested-nav__link'
										to={`/movie-store/genre/${genre}`}
									>
										{genre}
									</Link>
								</li>
							))}
						</ul>
					</li>
					<li className='nested-nav__item company-nav'>
						<Link to='/movie-store' className='nested-nav__link'>
							<span>Browse By Compnay</span> <i className='fa fa-angle-right' />
						</Link>

						<ul className='nested-nested-nav-2'>
							{productionCompanyList.map((company, idx) => (
								<li className='nested-nav__item' key={idx}>
									<Link
										className='nested-nav__link'
										to={`/movie-store/producer/${company}`}
									>
										{company}
									</Link>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default StoreNestedNav;
