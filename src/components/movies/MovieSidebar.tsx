import { useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../../models/Movie";

type Prop = {
	movies: Movie[];
	onClose: () => void;
};

const MovieSidebar: React.FC<Prop> = ({ movies, onClose }) => {
	return (
		<aside className="movies-sidebar">
			<h2>Movies you might like</h2>
			<div className="btn-close" onClick={onClose}>
				<i className="fa fa-times" />
			</div>

			<ul>
				{movies.map((movie, idx) => (
					<li key={idx}>
						<Link className="image-wrapper" to={`/movie-detail/${movie.id}`}>
							<img src={movie.imgUrl} alt="Movie image" />
						</Link>
						<div className="movie-content">
							<h3>{movie.title}</h3>
							<p>{movie.producer}</p>
						</div>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default MovieSidebar;
