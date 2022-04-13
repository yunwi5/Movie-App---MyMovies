import React, { useState, Fragment, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-regular-svg-icons';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useAuthContext } from '../../../store/auth-context';
import StoreNestedNav from './StoreNestedNav';

const VerticalNavList: React.FC = () => {
	const [ showDropdown, setShowDropdown ] = useState<boolean>(false);

	const authCtx = useAuthContext();
	const isLoggedIn = authCtx.isLoggedIn;

	const toggleDropdown = useCallback(() => {
		setShowDropdown((prevState) => !prevState);
	}, []);

	return (
		<Fragment>
			<FontAwesomeIcon icon={faBars} onClick={toggleDropdown} className='vertical-nav-icon' />
			{showDropdown && (
				<ClickAwayListener onClickAway={() => setShowDropdown(false)}>
					<ul className='vertical-nav-main'>
						<li className='nav-store'>
							<StoreNestedNav />
						</li>
						<li className='nav-main-item'>
							<NavLink
								className={(navData) =>
									navData.isActive ? 'nav-item nav-active' : 'nav-item'}
								to='about'
							>
								<i className='fa fa-quote-right' />
								<span className='nav-text'>About</span>
							</NavLink>
						</li>
						{isLoggedIn && (
							<li className='nav-main-item'>
								<NavLink
									className={(navData) =>
										navData.isActive ? 'nav-item nav-active' : 'nav-item'}
									to='/movies'
								>
									<i className='fa fa-th-list' />
									<span className='nav-text'>Movies List</span>
								</NavLink>
							</li>
						)}
						{isLoggedIn && (
							<li className='nav-main-item'>
								<NavLink
									className={(navData) =>
										navData.isActive ? 'nav-item nav-active' : 'nav-item'}
									to='add-movie'
								>
									<i className='fa fa-plus-square' />
									<span className='nav-text'>Add Movie</span>
								</NavLink>
							</li>
						)}
						{!isLoggedIn && (
							<li className='nav-main-item'>
								<NavLink
									className={(navData) =>
										navData.isActive ? 'nav-item nav-active' : 'nav-item'}
									to='auth/login'
								>
									<i className='fa fa-sign-in' />
									<span className='nav-text'>Log in</span>
								</NavLink>
							</li>
						)}
						{!isLoggedIn && (
							<li className='nav-main-item'>
								<NavLink
									className={(navData) =>
										navData.isActive ? 'nav-item nav-active' : 'nav-item'}
									to='auth/signup'
								>
									<i className='fa fa-user-plus' />
									<span className='nav-text'>Sign up</span>
								</NavLink>
							</li>
						)}
						{isLoggedIn && (
							<li className='nav-main-item'>
								<a href='#' className='nav-item' onClick={authCtx.logout}>
									<i className='fa fa-sign-out' />
									<span className='nav-text'>Log out</span>
								</a>
							</li>
						)}
					</ul>
				</ClickAwayListener>
			)}
		</Fragment>
	);
};

export default VerticalNavList;
