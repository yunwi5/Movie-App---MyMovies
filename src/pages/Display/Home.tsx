import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import { GenreList } from "../../models/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faGlobe,
	faStopwatch,
	faComments,
	faArrowDownWideShort
} from "@fortawesome/pro-thin-svg-icons";
import { faPopcorn, faCircleCheck } from "@fortawesome/pro-light-svg-icons";
import { ReactComponent as UPLogo } from "../../assets/SVG/Universal_Pictures_logo.svg";
import { ReactComponent as DisneyLogo } from "../../assets/SVG/Walt_Disney_Pictures.svg";
import { ReactComponent as MarvalLogo } from "../../assets/SVG/Marvel_Logo.svg";
import { ReactComponent as NetflixLogo } from "../../assets/SVG/Netflix_Logo.svg";
import { ReactComponent as PPLogo } from "../../assets/SVG/Paramount_Pictures_Logo.svg";
import { ReactComponent as CPLogo } from "../../assets/SVG/Columbia_Pictures_Logo.svg";

const animeUrl =
	"https://jw-webmagazine.com/wp-content/uploads/2021/07/Violet-Evergarden.jpg";

const actionUrl =
	"https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/21/1495551278-guardians-of-the-galaxy-vol-2-cast.jpg?crop=1xw:0.8912655971479501xh;center,top&resize=1200:*";

const sciUrl =
	"https://qph.fs.quoracdn.net/main-qimg-17cda6bcacc8197c34ea7add5d476470.webp";

const thrillerUrl =
	"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/03-the-joker-w1200-h630-1562679871.jpg?crop=1xw:0.9523809523809523xh;center,top&resize=1200:*";

const tvShowUrl =
	"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5fa80f666195861e90269d23%2FQueen-s-Gambit%2F960x0.jpg%3Ffit%3Dscale";

const romaticUrl =
	"https://focusmicrositesprod.s3.amazonaws.com/assets/uploads/post_5953d6733a487.jpg";

const dramaUrl =
	"https://www.indiewire.com/wp-content/uploads/2016/08/20140216-131646.jpg";

const documentaryUrl =
	"https://www.televisual.com/wp-content/uploads/3_1571413618_screen-shot-2019-10-18-at-16.40.40.jpg";

const childUrl =
	"https://www.denofgeek.com/wp-content/uploads/2019/02/how-to-train-your-dragon-the-hidden-world.jpg?fit=825%2C464";

const comediesUrl =
	"https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2015/07/07/Weekend/Images/wk-minions0710-5.jpg?t=20170517";

const musicalUrl = "https://images.indianexpress.com/2016/12/la-la-land-7592.jpg";

const horrorUrl = "https://uproxx.com/wp-content/uploads/2020/12/INVISIBLE-MAN.jpg";

const getGenreImgUrl = (genre: string) => {
	switch (genre) {
		case "Anime":
			return animeUrl;
		case "Action & Adventures":
			return actionUrl;
		case "Science-Fiction & Fantasy":
			return sciUrl;
		case "Thriller":
			return thrillerUrl;
		case "TV Shows":
			return tvShowUrl;
		case "Romantic Movies":
			return romaticUrl;
		case "Comedies":
			return comediesUrl;
		case "Music & Musicals":
			return musicalUrl;
		case "Drama":
			return dramaUrl;
		case "Documentaries":
			return documentaryUrl;
		case "Children & Family Movies":
			return childUrl;
		case "Horror":
			return horrorUrl;
		default:
			return animeUrl;
	}
};

const Home: React.FC = () => {
	const genreList = GenreList.slice(0, GenreList.length - 1);

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

			<section className="home__genres">
				<div className="genres-text">
					<h3 className="gradient-sub-heading genres-text__heading">
						We have 100+ movies across 12 different genres
					</h3>

					<p>
						We have movies prepared for various different genres so that you
						can simply add those sources to your collection as quick as
						possible. Please have a look at what we have in our store.
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
								<h4>10+ Movies On {genre}</h4>
								<Link className="btn explore-link" to="#">
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

			<section className="home__what">
				<h1>What Movies We Have</h1>
				<div className="content-box">
					<h3>
						We have movies from the most famous & popular movie Production
						companies in the world.
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
	);
};

export default Home;
