import React, { useContext, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MovieContext from "../../store/movie-context";
import MoviesList from "../../components/movies/MoviesList";
import { filterMovies } from "../../utilities/movie-util/movies-util";

function useQuery () {
	const { search } = useLocation();
	return useMemo(() => new URLSearchParams(search), [ search ]);
}

// Display Store Movies to the user, not the Users Movies.
const MoviesSearch: React.FC = () => {
	const query = useQuery();
	const searchWord = query.get("search");

	const movieCtx = useContext(MovieContext);
	const storeMovies = movieCtx.storeMovies;
	const [ filteredStoreMovies, setFilteredStoreMovies ] = useState(storeMovies);

	useEffect(
		() => {
			if (searchWord === null) return;
			const newFilteredMovies = filterMovies(storeMovies, searchWord);
			setFilteredStoreMovies(newFilteredMovies);
		},
		[ searchWord, storeMovies ]
	);

	return <MoviesList isForUser={false} initialMovies={filteredStoreMovies} />;
};

export default MoviesSearch;
