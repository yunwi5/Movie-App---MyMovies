import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

const Home: React.FC = () => {
	const user = useContext(AuthContext).user;
	const userName = user!.userName;

	// Main Home Page
	// This page should display various visual information to the user.
	// What to display ?

	return (
		<main className="home">
			<section className="home__heading">
				<img alt="heading img" />
				<h1>Welcome to MyMovies App, {userName}</h1>
			</section>

			<section className="home__about">
				<h2>Why use MyMovies App?</h2>
			</section>

			<footer className="home__footer">
				<h2>Hope you enjoy our service!</h2>
			</footer>
		</main>
	);
};

export default Home;
