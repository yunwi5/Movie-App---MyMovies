import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../../store/auth-context';
import UserInitial from '../../UI/DesignElement/UserInitial';

const NavItemList: React.FC = () => {
	const authCtx = useAuthContext();
	const isLoggedIn = authCtx.isLoggedIn;
	const username = authCtx.user ? authCtx.user.userName : '';

	return (
		<ul className='nav-main'>
			<li className='nav-main-item'>
				<NavLink
					className={(navData) => (navData.isActive ? 'nav-item nav-active' : 'nav-item')}
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
			{isLoggedIn &&
			username && (
				<li className='userIcon nav-main-item'>
					<UserInitial userName={username} />
				</li>
			)}
		</ul>
	);
};

export default NavItemList;
