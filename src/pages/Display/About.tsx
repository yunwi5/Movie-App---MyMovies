import React from "react";
import { Link } from "react-router-dom";
import storeImage from "../../assets/Images/AboutImages/Movie_Store.jpg";
import formImage from "../../assets/Images/AboutImages/Movie_Form.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const About: React.FC = () => {
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
			<section className="sorting-section">
				<div>Sort & Filter Movies</div>
			</section>
			{/* 3rd Section */}
			<section className="detail-section">
				<div>See Detail</div>
			</section>
			{/* Last section for editing */}
			<section className="edit-section">
				<div>Edit Your Movie</div>
			</section>
			{/* Evaluation Section can be added in the future */}
		</main>
	);
};

export default About;
