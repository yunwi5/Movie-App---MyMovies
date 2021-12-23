import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toDurationString } from "../../utilities/movies-util";
import MovieContext from "../../store/movie-context";
import DeleteModal from '../UI/Modal/DeleteModal';
import MovieSidebar from '../movies/MovieSidebar';
import Movie from '../../models/Movie';
import Rating from "@mui/material/Rating";
import getSimilarMovies from '../../utilities/movies-select-util';


// The functionality inclused deleting movie, editing movie (not available at the moment)
// Maybe adding comment.
const MovieDetail: React.FC<{movie: Movie}> = ({movie}) => {
	const navigate = useNavigate();

	const movieCtx = useContext(MovieContext);
	const movieId = movie.id;
	const moviesList = movieCtx.moviesList;

	const [navIsActive, setNavIsActive] = useState(false);
	const [enableBackdrop, setEnableBackdrop] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false); 


	const similarMovies = useMemo(() => {
		if (!movie) return;
		const similarMoviesAvailable = getSimilarMovies(moviesList, movie);
		return similarMoviesAvailable.slice(0, Math.min(similarMoviesAvailable.length, 7));
	}, [movieId]) 

	

	const deleteModalContent = {
		id: movieId,
		message: `Are you sure you want to delete ${movie.title}?`,
		onDelete: () => {
			movieCtx.deleteMovie(movieId);
			setShowModal(false);
			navigate('/movies');
		},
		onClose: () => {
			setShowModal(false);
		}
	}

	const durationString = toDurationString(movie.duration);

	const watchUrl = `https://www.netflix.com/search?q=${movie.title}`;
	const moreDetailUrl = `https://en.wikipedia.org/wiki/${movie.title}`;


	// Nav Bar Handling
	let timer: NodeJS.Timeout;

	const toggleNavHandler = () => {
		setNavIsActive(prevState => !prevState);
		timer = setTimeout(() => {
			setEnableBackdrop(true);
		}, 100);
	}

	const backdropNavHandler = () => {
		if (!enableBackdrop) return;
		setNavIsActive(false);
		setEnableBackdrop(false);
		clearTimeout(timer);
	}


	// Dynamically toggle isFavorite prop
	const setFavoriteHandler = () => {
		const isFavorite = !movie.isFavorite;
		const newMovie = {...movie, isFavorite};
		movieCtx.editMovie(newMovie);
	}

	
	return (
		<React.Fragment>
		{showModal && <DeleteModal modalContent={deleteModalContent}  />}
		<main className="movie-detail">
			{showSidebar && similarMovies && < MovieSidebar  movies={similarMovies} onClose={() => setShowSidebar(false)} /> }
			<section className="movie-detail__top" onClick={backdropNavHandler}>
				<div className={`movie-detail__nav ${navIsActive ? "movie-detail__nav--active" : ""}`}>
					<div className="icon-wrapper" onClick={toggleNavHandler}>
						<i className="fa fa-bars"></i>
					</div>
					<ul className="movie-detail__nav-bar">
						<li className="similar" onClick={() => setShowSidebar(true)}>
							<i className="fa fa-video-camera" />
							Similar Movies
						</li>
						<li className="edit">
							<i className="fa fa-pencil" /> Edit
						</li>
						<li className="delete" onClick={() => setShowModal(true)}>
							<i className="fa fa-eraser" />
							Delete
						</li>
					</ul>
				</div>
				<div className="movie-detail__heading">
					<div className="img-wrapper">
						<img src={movie.imgUrl} />
					</div>
					<div className="heading-content">
						<h1 className="movie-title">{movie.title} 
							{movie.isFavorite ? <i className="fa fa-star-o" ></i> : ''}
						</h1>
						<p className="movie-time">
							<span className="movie-time__main">
								{movie.year}
								{movie.duration && <><i className="fa fa-circle" />
								{durationString}</>}
							</span>
							{movie.duration && <span className="movie-time__sub">(&nbsp;{movie.duration} minutes&nbsp;)</span>}
						</p>
						{movie.director && <p className="movie-director"> {movie.director} </p>}
					</div>
				</div>
				<div className="movie-detail__info">
					<div className="rating-wrapper wrapper">
						<Rating className="rating" name="movie-rating" value={movie.rating / 2} readOnly />
						<span className="rating-text">{movie.rating}/10</span>
					</div>

					<div className="producer-wrapper wrapper">
						<h3>{movie.producer}</h3>
						<span>Producer</span>
					</div>

					<div className="ageRating-wrapper wrapper">
						<h3>15+</h3>
						<span>Rating</span>
					</div>
				</div>

				<div className="movie-detail__links">
					<button className="btn btn-favorite" onClick={setFavoriteHandler}>{movie.isFavorite ? "Unfavorite" : "Favorite"}</button>
					<button className="btn btn-watch"><a href={watchUrl}>Watch</a></button>
					<button className="btn btn-more"><a href={moreDetailUrl}>See More</a></button>
					{!showSidebar && 
					<button className="btn-sidebar" onClick={() => setShowSidebar(prev => !prev)}>
						<i className="fa fa-film"></i>
						Similar Movies
					</button>}
				</div>
			</section>

			<section className="movie-detail__bottom">
				<div className="movie-detail__about">
					<h2>About this movie</h2>
					<p>{movie.description}</p>
				</div>

				<div className="movie-detail__genres">
					<ul>{movie.genreList.map((genre, idx) => <li key={idx}>{genre}</li>)}</ul>
				</div>
			</section>
		</main>
		</React.Fragment>
	);
};

export default MovieDetail;
