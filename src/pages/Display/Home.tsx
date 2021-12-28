import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
	faGlobe,
	faStopwatch,
	faComments,
	faArrowDownWideShort
} from "@fortawesome/pro-thin-svg-icons";
import { faPopcorn } from "@fortawesome/pro-light-svg-icons";
//<FontAwesomeIcon icon="fa-thin fa-arrow-down-wide-short" />

const Home: React.FC = () => {
	return (
		<main className="home">
			<section className="heading">
				<div className="heading__content">
					<h1 className="heading__title">MyMovies App</h1>
					<div className="heading__paragraphs">
						<p>
							The ultimate movie platform for you to build your own custom
							movie collection.
						</p>
						{/* <p>
							You are welcome to add our store movies, and you are welcome to add your
							own movies.
						</p> */}
						<p>
							We provide collection & evaluation services for{" "}
							<strong>FREE</strong>.
						</p>

						<Link className="heading__link" to="/movie-store">
							<FontAwesomeIcon icon={faPopcorn as IconProp} /> Browse Movies
							&rarr;
						</Link>
					</div>
				</div>
			</section>

			<section className="home__about">
				<h1>Why MyMovies</h1>
				<div className="cards-wrapper">
					<div className="card col-1-of-4">
						<FontAwesomeIcon
							icon={faGlobe as IconProp}
							className="card__icon"
						/>
						<h3 className="card__heading">All The Movies</h3>
						<div className="card__paragraphs">
							<p>100+ Popular Movies</p>
							<p>13 Different Genres</p>
							<p>All Major Production Companies</p>
						</div>
					</div>
					<div className="card card--time col-1-of-4">
						<FontAwesomeIcon
							icon={faStopwatch as IconProp}
							className="card__icon"
						/>
						<h3 className="card__heading">Save Your Time</h3>
						<div className="card__paragraphs">
							<p>No Need to Add Basic Info</p>
							<p>Quick Browse & Search Features</p>
							<p>Simple & Quick Set Up</p>
						</div>
					</div>
					<div className="card card--comment col-1-of-4">
						<FontAwesomeIcon
							icon={faComments as IconProp}
							className="card__icon"
						/>
						<h3 className="card__heading">Make Comments</h3>
						<div className="card__paragraphs">
							<p>Fix Everything You Want</p>
							<p>Leave Comments To Your Movies</p>
							<p>Make Your Own Evaluation</p>
						</div>
					</div>
					<div className="card card--sort col-1-of-4">
						<FontAwesomeIcon
							icon={faArrowDownWideShort as IconProp}
							className="card__icon"
						/>
						<h3 className="card__heading">Sort And Search </h3>
						<div className="card__paragraphs">
							<p>Sort By Rating & Year Anytime</p>
							<p>Sort Both Store & User Movies</p>
							<p>Searching On Store Anytime</p>
						</div>
					</div>
				</div>

				<div className="btn-wrapper">
					<button className="btn">Learn More</button>
				</div>
			</section>

			<section className="home__what">
				<h1>What Movies We Have</h1>
			</section>

			<footer className="home__footer">
				<h2>Hope you enjoy our service!</h2>
			</footer>
		</main>
	);
};

export default Home;
