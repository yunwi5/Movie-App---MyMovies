import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../../store/movie-context";
import MoviesList from "../../components/movies/MoviesList";
import { filterMovies } from "../../utilities/movies-util";

// Display Store Movies to the user, not the Users Movies.
const MoviesSearch: React.FC = () => {
	const params = useParams();
	const searchWord = params.searchWord;

	const movieCtx = useContext(MovieContext);
	const storeMovies = movieCtx.storeMovies;
	const [ filteredStoreMovies, setFilteredStoreMovies ] = useState(storeMovies);

	useEffect(
		() => {
			const newFilteredMovies = filterMovies(storeMovies, searchWord);
			setFilteredStoreMovies(newFilteredMovies);
		},
		[ searchWord ]
	);

	console.log("movies length:", filteredStoreMovies.length);

	return <MoviesList isForUser={false} initialMovies={filteredStoreMovies} />;
};

export default MoviesSearch;
