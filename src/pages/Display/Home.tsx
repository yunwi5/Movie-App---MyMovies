import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieContext from "../../store/movie-context";
import { getGenreMoviesCount } from "../../utilities/movie-util/genre-movie-util";
import { GenreList } from "../../models/Movie";
import { getGenreImgUrl } from "../../assets/movies-img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faGlobe,
	faStopwatch,
	faComments,
	faArrowDownWideShort
} from "@fortawesome/pro-thin-svg-icons";
import { faPopcorn, faCircleCheck } from "@fortawesome/pro-light-svg-icons";
import { ReactComponent as UPLogo } from "../../assets/SVG/Universal_Pictures_Logo.svg";
import { ReactComponent as DisneyLogo } from "../../assets/SVG/Walt_Disney_Pictures.svg";
import { ReactComponent as MarvalLogo } from "../../assets/SVG/Marvel_Logo.svg";
import { ReactComponent as NetflixLogo } from "../../assets/SVG/Netflix_Logo.svg";
import { ReactComponent as PPLogo } from "../../assets/SVG/Paramount_Pictures_Logo.svg";
import { ReactComponent as CPLogo } from "../../assets/SVG/Columbia_Pictures_Logo.svg";

const Home: React.FC = () => {
	const storeMovies = useContext(MovieContext).storeMovies;
	const genreList = GenreList.slice(0, GenreList.length - 1);

	const genreCountsList = genreList.map((genre) => getGenreMoviesCount(storeMovies, genre));

	return (
		<Fragment>
			<Helmet>
				<title>Welcome to MyMovies</title>
				<meta name="description" content="Home page for MyMovies application" />
			</Helmet>
			<main className="home">
				<section className="heading">
					<div className="heading__content">
						<h1 className="heading__title">MyMovies App</h1>
						<div className="heading__paragraphs">
							<p>
								The ultimate movie platform for you to build your own custom movie
								collection.
							</p>
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

				{/* Section 2 Why MyMovies */}
				<section className="home__about">
					<h1>Why MyMovies</h1>
					<div className="cards-wrapper">
						<div className="card col-1-of-4">
							<FontAwesomeIcon icon={faGlobe as IconProp} className="card__icon" />
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
							<FontAwesomeIcon icon={faComments as IconProp} className="card__icon" />
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
						<Link to="/about" className="btn">
							Learn More
						</Link>
					</div>
				</section>

				{/* Section 3 - Flipping Genre Cards */}
				<section className="home__genres">
					<div className="genres-text">
						<h3 className="gradient-sub-heading genres-text__heading">
							We have 100+ movies across 12 different genres
						</h3>

						<p>
							We have movies prepared for various different genres so that you can
							simply add those sources to your collection as quick as possible. Please
							have a look at what we have in our store.
						</p>
					</div>
					<ul className="genres-cards">
						{genreList.map((genre, idx) => (
							<li key={idx} className="genre-card">
								<div className="card__side card__side--front">
									<div className="img-circle">
										<img
											src={getGenreImgUrl(genre)}
											alt={genre}
											className="img-content"
										/>
									</div>
									<h3>{genre}</h3>
								</div>
								<div className="card__side card__side--back">
									<FontAwesomeIcon
										className="back-icon"
										icon={faCircleCheck as IconProp}
									/>
									{/* Now Genre Movies Count should be dynamic */}
									<h4>
										{genreCountsList[idx]} Movies On {genre}
									</h4>
									<Link
										className="btn explore-link"
										to={`/movie-store/genre/${genre}`}
									>
										Explore
									</Link>
								</div>
							</li>
						))}
					</ul>

					<div className="btn-wrapper">
						<Link className="btn-link" to="/movie-store">
							Explore All
						</Link>
					</div>
				</section>

				{/* Section 4 - 3D Effect for Production Companies Cards */}
				<section className="home__what">
					<h1>What Movies We Have</h1>
					<div className="content-box">
						<h3>
							We have movies from the most famous & popular movie Production companies
							in the world.
						</h3>
						<div className="logos">
							<div className="logo-wrapper">
								<UPLogo className="company-logo" />
							</div>
							<div className="logo-wrapper">
								<DisneyLogo className="company-logo" />
							</div>
							<div className="logo-wrapper">
								<CPLogo className="company-logo" />
							</div>
							<div className="logo-wrapper">
								<NetflixLogo className="company-logo" />
							</div>
							<div className="logo-wrapper">
								<PPLogo className="company-logo" />
							</div>
							<div className="logo-wrapper">
								<MarvalLogo className="company-logo" />
							</div>
						</div>
					</div>
				</section>

				<footer className="home__footer">
					<h1>Hope you enjoy our service!</h1>
				</footer>
			</main>
		</Fragment>
	);
};

export default Home;
