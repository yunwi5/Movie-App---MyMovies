import React, { useContext, useState, useEffect } from "react";
import MovieContext from "../../store/movie-context";
import MovieCard from "./MovieCard";
import Movie from "../../models/Movie";
import sortMovies, { filterMovies } from "../../utilities/movies-util";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

// const selectTheme: SxProps<Theme> = { m1: 1, minWidth: 120 };

const MoviesList: React.FC<{ searchWord: string | undefined }> = ({ searchWord }) => {
	const movieCtx = useContext(MovieContext);
	const initialMoviesList = filterMovies(movieCtx.moviesList, searchWord);
	const [ moviesList, setMoviesList ] = useState(initialMoviesList);

	// Sorting
	const [ sortingStandard, setSortingStandard ] = useState<string>("");
	const [ sortingDirection, setSortingDirection ] = useState<string>("");

	const deleteMovieHandler = (id: string) => {
		movieCtx.deleteMovie(id);
		const newMoviesList = [ ...moviesList ].filter((movie) => movie.id !== id);
		setMoviesList(newMoviesList);
	};

	const editMovieHandler = (newMovie: Movie) => {
		movieCtx.editMovie(newMovie);
	};

	useEffect(
		() => {
			setMoviesList(initialMoviesList);
		},
		[ searchWord ]
	);

	useEffect(
		() => {
			const moviesCopy: Movie[] = [ ...moviesList ];
			sortMovies(moviesCopy, sortingStandard, sortingDirection);
			setMoviesList(moviesCopy);
		},
		[ sortingDirection ]
	);

	// console.table(moviesList);

	return (
		<div className="movies-container">
			<h2>Your Movie Collection</h2>
			<div className="select-wrapper">
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
				<span>{moviesList.length} Movies</span>
			</div>
			<ul className="movies-list">
				{moviesList.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						onDelete={deleteMovieHandler}
						onEdit={editMovieHandler}
					/>
				))}
			</ul>
		</div>
	);
};

export default MoviesList;
