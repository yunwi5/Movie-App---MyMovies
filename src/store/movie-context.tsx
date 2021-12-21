import React, { useState } from "react";
import Movie from "../models/Movie";
import DUMMY_MOVIES from "../assets/storeMovies";

interface Props {
	storeMovies: Movie[];
	moviesList: Movie[];
	addMovie: (movie: Movie) => void;
	deleteMovie: (id: string) => void;
	editMovie: (movie: Movie) => void;
	getMovie: (id: string) => Movie | undefined;
}

const contextObj: Props = {
	storeMovies: [],
	moviesList: [],
	addMovie: (movie: Movie) => {},
	deleteMovie: (id: string) => {},
	editMovie: (movie: Movie) => {},
	getMovie: (id: string): Movie | undefined => {
		return undefined;
	}
};

const MovieContext: React.Context<Props> = React.createContext(contextObj);

export const MovieContextProvider: React.FC = (props) => {
	const [ moviesList, setMoviesList ] = useState<Movie[]>(DUMMY_MOVIES);
	const storeMovies = DUMMY_MOVIES;

	const addMovie = (movie: Movie) => {
		setMoviesList((prevMovies) => [ movie, ...prevMovies ]);
	};

	const deleteMovie = (id: string) => {
		const filteredMovies = moviesList.filter((movie) => movie.id !== id);
		setMoviesList(filteredMovies);
	};

	const editMovie = (newMovie: Movie) => {
		const newMovies = [ ...moviesList ];
		const idx = moviesList.findIndex((m) => m.id === newMovie.id);
		newMovies[idx] = newMovie;
		setMoviesList(newMovies);
	};

	const getMovie = (id: string) => {
		const movie = moviesList.find((movie) => movie.id === id);
		return movie;
	};

	const value = {
		storeMovies,
		moviesList,
		addMovie,
		deleteMovie,
		editMovie,
		getMovie
	};

	return <MovieContext.Provider value={value}>{props.children}</MovieContext.Provider>;
};

export default MovieContext;
