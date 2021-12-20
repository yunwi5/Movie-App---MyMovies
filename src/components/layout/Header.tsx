import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const Header: React.FC = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	const navigate = useNavigate();
	const [ searchWord, setSearchWord ] = useState<string>('');

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		navigate('/movies/' + searchWord, { replace: false });
	};

	return (
		<header className="header">
			<h3>
				<NavLink
					to="/home"
					className={(navData) =>
						navData.isActive ? 'heading heading-active' : 'heading'}
				>
					MyMovies
				</NavLink>
			</h3>
			<ul>
				<li>
					<a className="nav-item">Categories</a>
				</li>
			</ul>
			<form className="header__nav-search" onSubmit={submitHandler}>
				<i className="fa fa-search" />
				<input
					type="text"
					placeholder="Search your movie title!"
					value={searchWord}
					onChange={(e) => setSearchWord(e.target.value)}
				/>
				{searchWord && (
					<span onClick={() => setSearchWord('')}>
						<i className="fa fa-times" />
					</span>
				)}
			</form>

			<ul>
				<li>
					<NavLink
						className={(navData) =>
							navData.isActive
								? 'nav-item nav-active'
								: 'nav-item'}
						to="about"
					>
						<i className="fa fa-quote-right" />
						About
					</NavLink>
				</li>
				{isLoggedIn && (
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive
									? 'nav-item nav-active'
									: 'nav-item'}
							to="/movies"
						>
							<i className="fa fa-th-list" />
							Movies List
						</NavLink>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive
									? 'nav-item nav-active'
									: 'nav-item'}
							to="add-movie"
						>
							<i className="fa fa-plus-square" />
							Add Movie
						</NavLink>
					</li>
				)}
				{!isLoggedIn && (
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive
									? 'nav-item nav-active'
									: 'nav-item'}
							to="auth/login"
						>
							<i className="fa fa-sign-in" />
							Log in
						</NavLink>
					</li>
				)}
				{!isLoggedIn && (
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive
									? 'nav-item nav-active'
									: 'nav-item'}
							to="auth/signup"
						>
							<i className="fa fa-user-plus" />
							Sign up
						</NavLink>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<a className="nav-item" onClick={authCtx.logout}>
							<i className="fa fa-sign-out" />
							Log out
						</a>
					</li>
				)}
				{isLoggedIn && (
					<li className="userIcon">
						<i className="fa fa-user-circle" />
					</li>
				)}
			</ul>
		</header>
	);
};

export default Header;
