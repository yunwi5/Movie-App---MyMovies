import { Fragment, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SideMoviesList from "./SideMoviesList";
import Movie from "../../../models/Movie";
import { shuffleList } from "../../../utilities/list-util";
import getSimilarMovies, {
	getSameGenreMovies,
	getSameDirectorMovies,
	getSameProducerMovies
} from "../../../utilities/movie-util/movies-select-util";

type Prop = {
	movie: Movie;
	storeMovies: Movie[];
	onClose: () => void;
};

const MovieSidebar: React.FC<Prop> = (props) => {
	const { movie, storeMovies, onClose } = props;
	const navigate = useNavigate();
	const movieId = movie.id;

	const similarMovies = useMemo(
		() => {
			const similarMoviesAvailable = getSimilarMovies(storeMovies, movie);
			return similarMoviesAvailable.slice(
				0,
				Math.min(similarMoviesAvailable.length, 5)
			);
		},
		[ movieId ]
	);

	const sameDirectorMovies = useMemo(
		() => {
			const sameDirectors = getSameDirectorMovies(storeMovies, movie);
			const shuffledList = shuffleList(sameDirectors);
			return shuffledList.slice(0, Math.min(shuffledList.length, 5));
		},
		[ movieId ]
	);

	const sameProducerMovies = useMemo(
		() => {
			const sameProducers = getSameProducerMovies(storeMovies, movie);
			const shuffledList = shuffleList(sameProducers);
			return shuffledList.slice(0, Math.min(shuffledList.length, 5));
		},
		[ movieId ]
	);

	// Always recommend Store Movies. I think this makes more sense!
	const switchMovieHandler = (movieId: string) => {
		onClose();
		navigate(`/movie-detail/store/${movieId}`);
	};

	return (
		<aside className="movies-sidebar">
			<h2 onClick={onClose}>
				Recommended Films <i className="fa fa-angle-right" />
			</h2>

			<div className="side-movies-continer">
				<SideMoviesList
					heading={"Most Similar Films"}
					movies={similarMovies}
					onSwitch={switchMovieHandler}
				/>

				{sameDirectorMovies.length > 0 && (
					<SideMoviesList
						heading={
							<Fragment>
								More By <span>{movie.director}</span>
							</Fragment>
						}
						movies={sameDirectorMovies}
						onSwitch={switchMovieHandler}
					/>
				)}

				{sameProducerMovies.length > 0 && (
					<SideMoviesList
						heading={
							<Fragment>
								More From{" "}
								<span className="dynamic-pro">
									{movie.producer}
								</span>
							</Fragment>
						}
						movies={sameProducerMovies}
						onSwitch={switchMovieHandler}
					/>
				)}
			</div>
		</aside>
	);
};

export default MovieSidebar;
