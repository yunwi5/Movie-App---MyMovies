import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "../../models/Movie";

type Prop = {
	movies: Movie[];
	onClose: () => void;
};

const MovieSidebar: React.FC<Prop> = ({ movies, onClose }) => {
	const navigate = useNavigate();

	// Always recommend Store Movies. I think this makes more sense!
	const switchMovieHandler = (movieId: string) => {
		onClose();
		navigate(`/movie-detail/store/${movieId}`);
	};

	return (
		<aside className="movies-sidebar">
			<h2 onClick={onClose}>
				Similar Films <i className="fa fa-angle-right" />
			</h2>

			<ul>
				{movies.map((movie, idx) => (
					<li className={`movie-card ${idx <= 2 ? "" : "movie-card--below"}`} key={idx}>
						<div className="image-wrapper" onClick={switchMovieHandler.bind(null, movie.id)}>
							<img src={movie.imgUrl} alt="Movie image" />
						</div>
						<div className="movie-content">
							<h3 onClick={switchMovieHandler.bind(null, movie.id)}>{movie.title}</h3>
							{movie.producer && <p>{movie.producer}</p>}
							<p className="line-rating">
								{movie.rating}
								<i className="fa fa-star" />
							</p>
							<p>{movie.genreList[0]}</p>
						</div>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default MovieSidebar;
