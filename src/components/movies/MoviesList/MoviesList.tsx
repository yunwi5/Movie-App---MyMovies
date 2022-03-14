import React, { useContext, useState, useEffect, useCallback } from "react";
import MovieContext from "../../../store/movie-context";
import MovieFilter from "../MoviesFilter/MovieFilter";
import MovieCard from "./MovieCard";
import MoviePageNav from "../../UI/FunctionalElement/PageNav";
import MovieSearchbar from "../MovieSupport/MovieSearchbar";
import { shuffleList } from "../../../utilities/list-util";
import Movie, { genre as MovieGenre } from "../../../models/Movie";
import sortMovies, {
	filterMovies,
	getCurrentPageMovies
} from "../../../utilities/movie-util/movies-util";

interface Props {
	initialMovies: Movie[];
	isForUser: boolean;
}

const MoviesList: React.FC<Props> = (props) => {
	const { isForUser, initialMovies } = props;
	const movieCtx = useContext(MovieContext);

	// Sorting
	const [ sortingStandard, setSortingStandard ] = useState<string>("");
	const [ sortingDirection, setSortingDirection ] = useState<string>("");

	// Filter Movies
	const [ filteredMovies, setFilteredMovies ] = useState(initialMovies);
	const filterMoviesLength = filteredMovies.length;

	const [ filterRating, setFilterRating ] = useState(0);
	const [ filterGenres, setFilterGenres ] = useState<string[]>([]);
	const [ showOnlyFav, setShowOnlyFav ] = useState(false);

	// pages
	const [ currentPage, setCurrentPage ] = useState<number>(1);
	const perPage = 7;
	const totalPages = Math.ceil(filteredMovies.length / perPage);

	// Control sidebar
	const [ showSidebar, setShowSidebar ] = useState(false);

	const editMovieHandler = (newMovie: Movie) => {
		movieCtx.editMovie(newMovie);
	};

	const shuffleMoviesHandler = () => {
		const shuffledList = shuffleList(filteredMovies);
		// console.table(shuffledList);
		setFilteredMovies(shuffledList);
		setSortingStandard("");
		setSortingDirection("");
	};

	const getRatingCount = useCallback(
		(ratingThreshold: number) => {
			let count = 0;
			initialMovies.forEach((movie) => {
				if (movie.rating >= ratingThreshold) {
					count++;
				}
			});
			return count;
		},
		[ initialMovies ]
	);

	const getGenreCount = useCallback(
		(genreName: string) => {
			let count = 0;
			initialMovies.forEach((movie) => {
				if (movie.genreList.includes(genreName as MovieGenre)) {
					count++;
				}
			});
			return count;
		},
		[ initialMovies ]
	);

	useEffect(
		() => {
			let survivedMovies: Movie[] = initialMovies;

			// Apply Rating Filter
			if (filterRating) {
				survivedMovies = initialMovies.filter((movie) => movie.rating >= filterRating);
			}

			// Apply Genre Filter
			if (filterGenres && filterGenres.length > 0) {
				survivedMovies = survivedMovies.filter((movie) => {
					const genres = movie.genreList;
					for (let g of genres) {
						if (filterGenres.includes(g)) {
							return true;
						}
					}
					return false;
				});
			}

			// Apply Favorite Filter
			if (showOnlyFav) {
				survivedMovies = survivedMovies.filter((movie) => movie.isFavorite);
			}
			setFilteredMovies(survivedMovies);
		},
		[ filterRating, filterGenres, showOnlyFav, initialMovies ]
	);

	useEffect(
		() => {
			setFilteredMovies(initialMovies);
		},
		[ initialMovies ]
	);

	useEffect(
		() => {
			const filteredMoviesCopy = [ ...filteredMovies ];
			sortMovies(filteredMoviesCopy, sortingStandard, sortingDirection);
			setFilteredMovies(filteredMoviesCopy);
		},
		[ sortingDirection, sortingStandard ]
	);

	const prevPageHandler = useCallback(
		() => {
			if (currentPage <= 1) return;
			setCurrentPage((prevPage) => prevPage - 1);
		},
		[ currentPage ]
	);

	const nextPageHandler = useCallback(
		() => {
			if (currentPage >= totalPages) return;
			setCurrentPage((prevPage) => prevPage + 1);
		},
		[ currentPage, totalPages ]
	);

	return (
		<main className={`main-content ${showSidebar ? "main-content--extend" : ""}`}>
			<MovieFilter
				onRatingCount={getRatingCount}
				onGenreCount={getGenreCount}
				isForUser={isForUser}
				onFilterRating={setFilterRating}
				onFilterGenres={setFilterGenres}
				filterRating={filterRating}
				filterGenres={filterGenres}
			/>
			<div className="movies-container">
				{isForUser ? <h2>Your Movie Collection</h2> : <h2>The Store Movies</h2>}
				<MovieSearchbar
					onShowSidebar={() => setShowSidebar((prevState) => !prevState)}
					sortingStandard={sortingStandard}
					onSortingStandard={(newStandard: string) => setSortingStandard(newStandard)}
					sortingDirection={sortingDirection}
					onSortingDirection={(newDirection: string) => setSortingDirection(newDirection)}
					onShuffle={shuffleMoviesHandler}
					onToggleFavorite={() => setShowOnlyFav((prevState) => !prevState)}
					showOnlyFav={showOnlyFav}
					moviesLength={filteredMovies.length}
				/>

				<ul className="movies-list">
					{getCurrentPageMovies(filteredMovies, currentPage, perPage).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onEdit={editMovieHandler}
							isForUser={isForUser}
						/>
					))}
				</ul>

				{!filterMoviesLength && <p>No Movies Found For Your Search and Filter</p>}

				<MoviePageNav
					currentPage={currentPage}
					totalPages={totalPages}
					onPrev={prevPageHandler}
					onNext={nextPageHandler}
				/>
			</div>
		</main>
	);
};

export default MoviesList;
