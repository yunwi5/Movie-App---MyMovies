import { Fragment } from "react";
import { JsxElement } from "typescript";
import Movie from "../../../models/Movie";

interface Props {
	movies: Movie[];
	heading: string | React.ReactNode;
	onSwitch: (id: string) => void;
}

const SideMoviesList: React.FC<Props> = (props) => {
	const { movies, heading, onSwitch } = props;

	return (
		<section className="side-section">
			<h3 className="heading">{heading}</h3>
			<ul>
				{movies.map((movie, idx) => (
					<li
						className={`movie-card ${idx <= 2
							? ""
							: "movie-card--below"}`}
						key={idx}
					>
						<div
							className="image-wrapper"
							onClick={onSwitch.bind(null, movie.id)}
						>
							<img src={movie.imgUrl} alt="Movie image" />
						</div>
						<div className="movie-content">
							<h3 onClick={onSwitch.bind(null, movie.id)}>
								{movie.title}
							</h3>
							{movie.producer && <p>{movie.producer}</p>}
							<p className="line-rating">
								{movie.rating}
								<i className="fa fa-star" />
							</p>
							{movie.director && <p>{movie.director}</p>}
							<p>{movie.genreList[0]}</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default SideMoviesList;
