import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import storeImage from "../../assets/Images/AboutImages/Movie_Store.jpg";
import formImage from "../../assets/Images/AboutImages/Movie_Form.jpg";
import sortingImage from "../../assets/Images/AboutImages/sorting-functionality.jpg";
import detailImage from "../../assets/Images/AboutImages/detail-page.jpg";
import editImage from "../../assets/Images/AboutImages/edit-functionality.jpg";
import { ReactComponent as IMDbLogo } from "../../assets/SVG/IMDb_Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
	faArrowDownZA,
	faArrowRight,
	faBallotCheck,
	faPenToSquare,
	faBinoculars,
	faMagnifyingGlass,
	faListUl,
	faStarHalf
} from "@fortawesome/pro-duotone-svg-icons";

const About: React.FC = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	const navigate = useNavigate();

	return (
		<main className="about-page">
			<h1>About MyMovies Services</h1>
			{/* 1st Section for Adding */}
			<section className="add-section">
				<div className="add-section__heading">
					<h2>How to make your movie collection</h2>
					<p>There are two main ways to add Movie to your collection.</p>
					<p>
						One is importing existing movieovies from Movie Store, and the
						other is adding your new movie independently!
					</p>
				</div>
				<div className="add-section__container">
					{/* FIRST CARD */}
					<div className="about-card">
						<div className="img-wrapper">
							<img src={storeImage} alt="Movie Store" />
						</div>
						<div className="text-content">
							<h3 className="card-heading">Movie Store</h3>
							<p>
								Our Movie Store contains 100+ famoupopuler movies in the
								World for you to add those movies directly into your
								collection! Our store movies make sure to have all the
								necessary key information attached so that you don't need
								to find and add the information additionally.
							</p>
						</div>
						<Link to="/movie-store" className="add-link">
							Dive In!
						</Link>
					</div>
					<div className="horizontal-line" />
					{/* SECOND CARD */}
					<div className="about-card">
						<div className="img-wrapper">
							<img src={formImage} alt="Movie Form" />
						</div>
						<div className="text-content">
							<h3 className="card-heading">New Movie Form</h3>
							<p>
								If the movie you want is not in the store, the other
								option is to add your own movie with Movie Form we
								prepared. You can add movies not currently existing in the
								store by using Movie Form to independently add your own
								favorite movies. Note that your custom movies will be
								totally independnet to our Store Movies.
							</p>
						</div>
						<Link to="/add-movie" className="add-link">
							Dive In!
						</Link>
					</div>
				</div>
				<div className="add-section__footer">
					<p className="user-message">
						<FontAwesomeIcon
							className="quote-icon"
							icon={faQuoteLeft as IconProp}
						/>
						&nbsp;{" "}
						<span>
							Note that you can add new movies by using the search bar of
							course!
						</span>
					</p>
					<p className="user-message">
						<FontAwesomeIcon
							className="quote-icon"
							icon={faQuoteLeft as IconProp}
						/>
						&nbsp;{" "}
						<span>
							We are currently implementing automatic addition of your
							custom movies by finding the key movie information using our
							search algorithm.
						</span>
					</p>
				</div>
			</section>
			{/* 2nd Section for Sorting & Filtering & Searching */}
			<section className="manage-section">
				<h2 className="manage-section__heading">How to manage your movies</h2>

				{/* FIRST FEATURE */}
				<div className="manage-section__part sorting-part">
					<div className="img-wrapper">
						<img src={sortingImage} alt="sort & filter functionality" />
					</div>
					<div className="text-content">
						<h3>
							<FontAwesomeIcon icon={faArrowDownZA as IconProp} />{" "}
							<span>Sort & Filter</span>
						</h3>
						<p>
							You can Sort the movies based on rating, released year and
							title, and you can Filter the movies based on rating and
							genres. By the way, you can either sort our store movies, or
							your collection movies!
						</p>
						<Link className="btn link" to={`/store-movies`}>
							<span>Have A Try</span>{" "}
							<FontAwesomeIcon
								className="icon"
								icon={faArrowRight as IconProp}
							/>
						</Link>
					</div>
				</div>

				{/* SECOND FEATURE */}
				<div className="manage-section__part detail-part">
					<div className="text-content">
						<h3>
							<FontAwesomeIcon icon={faBallotCheck as IconProp} />{" "}
							<span>See the detail</span>
						</h3>
						<p>
							You can see all the details of the movie in the movie detail
							page. You can see the detail of either the store movie or your
							collection movie.
						</p>
						<Link className="btn link" to={`/movie-detail/store/${"m15"}`}>
							<FontAwesomeIcon
								className="icon"
								icon={faBinoculars as IconProp}
							/>&ensp;
							<span>See More</span>
						</Link>
					</div>
					<div className="img-wrapper">
						<img src={detailImage} alt="sort & filter functionality" />
					</div>
				</div>

				{/* THIRD FEATURE */}
				<div className="manage-section__part edit-part">
					<div className="img-wrapper">
						<img src={editImage} alt="sort & filter functionality" />
					</div>
					<div className="text-content">
						<h3>
							<FontAwesomeIcon icon={faPenToSquare as IconProp} />{" "}
							<span>Edit & Customize</span>
						</h3>
						<div>
							<p>
								You can edit your movies and customize them. Feel free to
								change Image URL, rating, description, genres, comments
								and so on.
							</p>
							<p>
								To edit movies, you need to add movies to your collection
								first either from the store, or using the custom addition.
							</p>
						</div>
						<div className="links-wrapper">
							<Link className="btn link" to={`/movie-store`}>
								<FontAwesomeIcon
									className="icon"
									icon={faMagnifyingGlass as IconProp}
								/>&ensp;
								<span>Explore Store</span>
							</Link>
							{isLoggedIn && (
								<button
									className="btn link"
									onClick={() => navigate("/movies")}
								>
									<FontAwesomeIcon
										className="icon"
										icon={faListUl as IconProp}
									/>&ensp;
									<span>Your List</span>
								</button>
							)}
							{!isLoggedIn && (
								<button className="btn link link-invalid" disabled>
									<FontAwesomeIcon
										className="icon"
										icon={faListUl as IconProp}
									/>&ensp;
									<span>Your List</span>
								</button>
							)}
						</div>
					</div>
				</div>
				<p className="user-message">
					<FontAwesomeIcon
						className="quote-icon"
						icon={faQuoteLeft as IconProp}
					/>
					&nbsp;{" "}
					<span>
						We are planning to add evaluation functionality for user movies,
						so that you can add & edit some evaluations to your movies!
					</span>
				</p>
			</section>
			{/* ABOUT RATINGS */}
			<section className="rating-section">
				<h2 className="rating-section__heading">About the Ratings</h2>
				<div className="cards-wrapper">
					<div className="rating-card">
						<IMDbLogo className="icon" />
						<h3>IMDb Ratings</h3>
						<p>
							Our store ratings are based on IMDb movies ratings. We
							included IMDb ratings as initial store ratings because so many
							people contributed to the IMDb ratings, and its average rating
							can be a goot indicator for you when sorting the movies
							according to the ratings.
						</p>
					</div>
					<div className="rating-card">
						<FontAwesomeIcon className="icon" icon={faStarHalf as IconProp} />
						<h3>User Ratings</h3>
						<p>
							Note that if you collect movies from the store, initial
							ratings will be set to store IMDb ratings. You can of course
							adjust your ratings whenever you want.You can set your own
							ratings between 0 and 10. By the way, negative ratings are not
							supported in our app.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};

export default About;
