import React, { useContext, useState, useEffect } from "react";
import MovieContext from "../../store/movie-context";
import MovieFilter from "./MoviesFilter/MovieFilter";
import MovieCard from "./MovieCard";
import Movie, { genre as MovieGenre } from "../../models/Movie";
import sortMovies, { filterMovies, getCurrentPageMovies } from "../../utilities/movies-util";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const MoviesList: React.FC<{ searchWord: string | undefined }> = ({ searchWord }) => {
	const movieCtx = useContext(MovieContext);
	const initialMoviesList = filterMovies(movieCtx.moviesList, searchWord);
	// Seach Filter is already done here.
	const [ moviesList, setMoviesList ] = useState(initialMoviesList);

	// Sorting
	const [ sortingStandard, setSortingStandard ] = useState<string>("");
	const [ sortingDirection, setSortingDirection ] = useState<string>("");

	// Filter Movies
	const [ filteredMovies, setFilteredMovies ] = useState(initialMoviesList);

	// pages
	const [ currentPage, setCurrentPage ] = useState<number>(1);
	const perPage = 7;
	const totalPages = Math.ceil(filteredMovies.length / perPage);

	// Control sidebar
	const [ showSidebar, setShowSidebar ] = useState(false);

	const deleteMovieHandler = (id: string) => {
		movieCtx.deleteMovie(id);
		const newMoviesList = [ ...moviesList ].filter((movie) => movie.id !== id);
		setMoviesList(newMoviesList);
		const newFilteredMoviesList = [ ...filteredMovies ].filter((movie) => movie.id !== id);
		setFilteredMovies(newFilteredMoviesList);
	};

	const editMovieHandler = (newMovie: Movie) => {
		movieCtx.editMovie(newMovie);
	};

	const getRatingCount = (ratingThreshold: number) => {
		let count = 0;
		filteredMovies.forEach((movie) => {
			if (movie.rating >= ratingThreshold) {
				count++;
			}
		});
		return count;
	};

	const getGenreCount = (genreName: string) => {
		let count = 0;
		filteredMovies.forEach((movie) => {
			if (movie.genreList.includes(genreName as MovieGenre)) {
				count++;
			}
		});
		return count;
	};

	const filterHandler = (ratingThreshold: number, filterGenresList: string[]) => {
		console.log("filterHandler: ratingThreshold:", ratingThreshold, "genres:", filterGenresList);
		const ratingSurvivedMovies = moviesList.filter((movie) => movie.rating >= ratingThreshold);

		if (filterGenresList.length < 1) {
			setFilteredMovies(ratingSurvivedMovies);
			return;
		}

		let genreSurvivedMovies: Movie[] = [];
		for (const movie of ratingSurvivedMovies) {
			const genres = movie.genreList;
			for (let g of genres) {
				if (filterGenresList.includes(g)) {
					genreSurvivedMovies.push(movie);
					break;
				}
			}
		}
		setFilteredMovies(genreSurvivedMovies);
	};

	useEffect(
		() => {
			setMoviesList(initialMoviesList);
		},
		[ searchWord ]
	);

	useEffect(
		() => {
			const filteredMoviesCopy = [ ...filteredMovies ];
			sortMovies(filteredMoviesCopy, sortingStandard, sortingDirection);
			setFilteredMovies(filteredMoviesCopy);
		},
		[ sortingDirection ]
	);

	const prevPageHandler = () => {
		if (currentPage <= 1) return;
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const nextPageHandler = () => {
		if (currentPage >= totalPages) return;
		setCurrentPage((prevPage) => prevPage + 1);
	};

	return (
		<main className={`main-content ${showSidebar ? "main-content--extend" : ""}`}>
			<MovieFilter
				moviesList={moviesList}
				onFilter={filterHandler}
				onRatingCount={getRatingCount}
				onGenreCount={getGenreCount}
			/>
			<div className="movies-container">
				<h2>Your Movie Collection</h2>
				<div className="select-wrapper">
					<button className="btn-filter" onClick={() => setShowSidebar((prevState) => !prevState)}>
						<i className="fa fa-filter" />
						&ensp;Filter
					</button>
					<FormControl
						className="movie-select"
						variant={sortingStandard ? "filled" : "standard"}
						sx={{ m: 1, minWidth: 120, fontSize: 50 }}
					>
						<InputLabel id="simple-sort-standard-label">Sort by</InputLabel>
						<Select
							label="Sort by"
							labelId="simple-sort-standard-label"
							id="simple-sort-standard"
							defaultValue=""
							value={sortingStandard}
							onChange={(e: SelectChangeEvent) => {
								setSortingStandard(e.target.value as string);
							}}
						>
							<MenuItem value="rating">Rating</MenuItem>
							<MenuItem value="title">Title</MenuItem>
							<MenuItem value="year">Year</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						className="movie-select"
						variant={sortingDirection ? "filled" : "standard"}
						sx={{ m: 1, minWidth: 120 }}
					>
						<InputLabel id="simple-sort-direction-label">Direction</InputLabel>
						<Select
							label="Direction"
							labelId="simple-sort-direction-label"
							id="simple-sort-direction"
							defaultValue=""
							value={sortingDirection}
							onChange={(event: SelectChangeEvent<unknown>) => {
								setSortingDirection(event.target.value as string);
							}}
						>
							<MenuItem value="ASC">Ascending</MenuItem>
							<MenuItem value="Des">Descending</MenuItem>
						</Select>
					</FormControl>
					<span>{filteredMovies.length} Movies</span>
				</div>
				<ul className="movies-list">
					{getCurrentPageMovies(filteredMovies, currentPage, perPage).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onDelete={deleteMovieHandler}
							onEdit={editMovieHandler}
						/>
					))}
				</ul>
				<section className="page-nav">
					<div
						className={`page-nav__icon-wrap ${currentPage === 1
							? "page-nav__icon-wrap--invalid"
							: ""}`}
						onClick={prevPageHandler}
					>
						<i className="fa fa-angle-left" />
					</div>
					<p className="page-numbers">
						<strong>{currentPage}</strong> <i className="fa fa-minus" /> {totalPages}
					</p>
					<div
						className={`page-nav__icon-wrap ${currentPage === totalPages
							? "page-nav__icon-wrap--invalid"
							: ""}`}
						onClick={nextPageHandler}
					>
						<i className="fa fa-angle-right" />
					</div>
				</section>
			</div>
		</main>
	);
};

export default MoviesList;
