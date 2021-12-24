import React, { useState, useContext, useEffect } from "react";
import Movie from "../models/Movie";
import AuthContext from "./auth-context";
import DUMMY_MOVIES from "../assets/storeMovies";
import { addMovieToUser, deleteMovieFromUser, putUserMovie } from '../api/movie-api';

interface Props {
	storeMovies: Movie[];
	moviesList: Movie[];
	addMovie: (movie: Movie) => void;
	deleteMovie: (movie: Movie) => void;
	editMovie: (movie: Movie) => void;
	getUserMovie: (id: string) => Movie | undefined;
	getStoreMovie: (id: string) => Movie | undefined;
}

const contextObj: Props = {
	storeMovies: [],
	moviesList: [],
	addMovie: (movie: Movie) => {},
	deleteMovie: (movie: Movie) => {},
	editMovie: (movie: Movie) => {},
	getUserMovie: (id: string): Movie | undefined => {
		return undefined;
	},
	getStoreMovie: (id: string): Movie | undefined => {
		return undefined;
	},
};

const MovieContext: React.Context<Props> = React.createContext(contextObj);



export const MovieContextProvider: React.FC = (props) => {
	const authCtx = useContext(AuthContext);
	// const userMovies = authCtx.
	const user = authCtx.user;
	const {id, email} = user || {id: null, email: null};
	const userMovies = authCtx.user?.movies || [];

	const storeMovies = DUMMY_MOVIES;
	const [ moviesList, setMoviesList ] = useState<Movie[]>(userMovies); // Create Copy For Now temporarily

	const addMovie = async (newMovie: Movie) => {
		const isAlreadyAdded = moviesList.findIndex((m) => m.id === newMovie.id);
		if (isAlreadyAdded >= 0) return;

		// The movies were not previously added.
		if (newMovie.isFromStore) {
			newMovie = { ...newMovie, isFromStore: false };
		}
		setMoviesList((prevMovies) => [ newMovie, ...prevMovies ]);

		// Send some POST request to the Server at the same time!
		if (!id || !newMovie.id) return;
		console.log('Try adding movie to the user!');
		await addMovieToUser(id, newMovie);
	};

	const deleteMovie = (movie: Movie) => {
		const filteredMovies = moviesList.filter((m) => m.id !== movie.id);
		setMoviesList(filteredMovies);

		// Delete movie from Database with DELETE Request. 
		if (!id) return;
		deleteMovieFromUser(id, movie);
	};

	const editMovie = (newMovie: Movie) => {
		if (newMovie.isFromStore) throw new Error("You cannot edit movie from the store!");
		const newMovies = [ ...moviesList ];
		const idx = moviesList.findIndex((m) => m.id === newMovie.id);
		newMovies[idx] = newMovie;
		setMoviesList(newMovies);
	};

	const getUserMovie = (id: string) => {
		const userMovie = moviesList.find((movie) => movie.id === id);
		return userMovie;
	};

	const getStoreMovie = (id: string) => {
		const storeMovie = storeMovies.find((movie) => movie.id === id);
		return storeMovie;
	};


	
	useEffect(() => {
		if (email) {
			setMoviesList(authCtx.user?.movies || []);
		}

	}, [id])

	const value = {
		storeMovies,
		moviesList,
		addMovie,
		deleteMovie,
		editMovie,
		getUserMovie,
		getStoreMovie
	};

	return <MovieContext.Provider value={value}>{props.children}</MovieContext.Provider>;
};

export default MovieContext;
