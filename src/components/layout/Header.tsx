import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Header: React.FC = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	const navigate = useNavigate();
	const [ searchWord, setSearchWord ] = useState<string>("");

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		navigate("/store-movies/" + searchWord, { replace: false });
	};

	return (
		<header className="header">
			<h3>
				<NavLink
					to="/home"
					className={(navData) => (navData.isActive ? "heading heading-active" : "heading")}
				>
					MyMovies
				</NavLink>
			</h3>
			<ul className="nav-front">
				<li className="nav-front__categories nav-main-item">
					<a className="nav-item">
						<i className="fa fa-shopping-bag" />
						Movie Store
					</a>
					{/* Nested navigation for browsing movies */}
					<ul className="nested-nav">
						<li>
							<Link to="/movie-store">
								Browse Our Store <i className="fa fa-angle-right" />
							</Link>
						</li>
						<li>
							<Link to="/movie-store">
								Browse By Genre <i className="fa fa-angle-right" />
							</Link>
						</li>
					</ul>
				</li>
			</ul>
			<form className="header__nav-search" onSubmit={submitHandler}>
				<i className="fa fa-search" />
				<input
					type="text"
					placeholder="Search movie on store!"
					value={searchWord}
					onChange={(e) => setSearchWord(e.target.value)}
				/>
				{searchWord && (
					<span onClick={() => setSearchWord("")}>
						<i className="fa fa-times" />
					</span>
				)}
			</form>

			<ul className="nav-main">
				<li className="nav-main-item">
					<NavLink
						className={(navData) => (navData.isActive ? "nav-item nav-active" : "nav-item")}
						to="about"
					>
						<i className="fa fa-quote-right" />
						About
					</NavLink>
				</li>
				{isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) => (navData.isActive ? "nav-item nav-active" : "nav-item")}
							to="/movies"
						>
							<i className="fa fa-th-list" />
							Movies List
						</NavLink>
					</li>
				)}
				{isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) => (navData.isActive ? "nav-item nav-active" : "nav-item")}
							to="add-movie"
						>
							<i className="fa fa-plus-square" />
							Add Movie
						</NavLink>
					</li>
				)}
				{!isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) => (navData.isActive ? "nav-item nav-active" : "nav-item")}
							to="auth/login"
						>
							<i className="fa fa-sign-in" />
							Log in
						</NavLink>
					</li>
				)}
				{!isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) => (navData.isActive ? "nav-item nav-active" : "nav-item")}
							to="auth/signup"
						>
							<i className="fa fa-user-plus" />
							Sign up
						</NavLink>
					</li>
				)}
				{isLoggedIn && (
					<li className="nav-main-item">
						<a className="nav-item" onClick={authCtx.logout}>
							<i className="fa fa-sign-out" />
							Log out
						</a>
					</li>
				)}
				{isLoggedIn && (
					<li className="userIcon nav-main-item">
						<i className="fa fa-user-circle" />
					</li>
				)}
			</ul>
		</header>
	);
};

export default Header;
