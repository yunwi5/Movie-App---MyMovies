import React, { useState, useContext, useEffect } from 'react';
import Movie from '../models/Movie';
import AuthContext from './auth-context';
import DUMMY_MOVIES from '../assets/storeMovies';
import { addMovieToUser, deleteMovieFromUser, putUserMovie } from '../api/user-movie-api';
import { addSingleMovieToDb, getAllMoviesFromDb } from '../api/store-movie-api';
import { userIsAdmin } from '../utilities/admin-util';

interface Props {
    storeMovies: Movie[];
    moviesList: Movie[];
    addMovie: (movie: Movie) => void;
    deleteMovie: (movie: Movie) => void;
    editMovie: (movie: Movie) => void;
    getUserMovie: (id: string) => Movie | undefined;
    getStoreMovie: (id: string) => Movie | undefined;
    addMovieToStore: (movie: Movie) => void;
}

const contextObj: Props = {
    storeMovies: [],
    moviesList: [],
    addMovie: (movie: Movie) => {},
    deleteMovie: (movie: Movie) => {},
    editMovie: (movie: Movie) => {},
    getUserMovie: (id: string): Movie | undefined => undefined,
    getStoreMovie: (id: string): Movie | undefined => undefined,
    addMovieToStore: (movie: Movie) => {},
};

const MovieContext: React.Context<Props> = React.createContext(contextObj);

export const MovieContextProvider: React.FC = (props) => {
    const authCtx = useContext(AuthContext);
    // const userMovies = authCtx.
    const user = authCtx.user;
    const { id, email } = user || { id: null, email: null };
    const userMovies = authCtx.user?.movies || [];

    const [storeMoviesList, setStoreMoviesList] = useState(DUMMY_MOVIES);
    const [moviesList, setMoviesList] = useState<Movie[]>(userMovies); // Create Copy For Now temporarily

    const addMovie = async (newMovie: Movie) => {
        const isAlreadyAdded = moviesList.findIndex((m) => m.id === newMovie.id);
        if (isAlreadyAdded >= 0) {
            alert(`Movie ${newMovie.title} was already added to your collection!`);
            return;
        }
        // The movies were not previously added.
        if (newMovie.isFromStore) {
            // When adding movies, make sure to clear the existing comments, because
            // those comments are Store Comments which are not relevant to user specific movie collection.
            newMovie = { ...newMovie, isFromStore: false, comments: [] };
        }
        // Send some POST request to the Server at the same time!
        if (!id || !newMovie.id) return;
        const movieKey = await addMovieToUser(id, newMovie);
        newMovie.key = movieKey;

        // Set the movie lst after getting movieKey from the Server.
        setMoviesList((prevMovies) => [newMovie, ...prevMovies]);
    };

    const addMovieToStore = async (newMovie: Movie) => {
        const existingIndex = storeMoviesList.findIndex(
            (m) => m.id === newMovie.id || m.title === newMovie.title,
        );
        if (existingIndex >= 0) {
            alert('This movie was alraedy added to the store!');
            return;
        }
        const isAdmin = userIsAdmin(email);
        if (!isAdmin) {
            alert('Admin authority is requried for adding to the store movies!');
            return;
        }

        const newMovieCpy = { ...newMovie, isFromStore: true };
        // Verified as Admin, so add movie to the store
        await addSingleMovieToDb(newMovieCpy);
        setStoreMoviesList((prevList) => [...prevList, newMovieCpy]);
    };

    const deleteMovie = (movie: Movie) => {
        const filteredMovies = moviesList.filter((m) => m.id !== movie.id);
        setMoviesList(filteredMovies);

        // Delete movie from Database with DELETE Request.
        if (!id) return;
        deleteMovieFromUser(id, movie);
    };

    const editMovie = (newMovie: Movie) => {
        if (newMovie.isFromStore) throw new Error('You cannot edit movie from the store!');
        const newMovies = [...moviesList];
        const idx = moviesList.findIndex((m) => m.id === newMovie.id);
        newMovies[idx] = newMovie;
        setMoviesList(newMovies);

        // Put modified movie to the Database with PUT Request.
        // Currently, the only modification is isFavorite property.
        if (!id) return;
        putUserMovie(id, newMovie);
    };

    const getUserMovie = (id: string) => {
        const userMovie = moviesList.find((movie) => movie.id === id);
        return userMovie;
    };

    const getStoreMovie = (id: string) => {
        const storeMovie = storeMoviesList.find((movie) => movie.id === id);
        return storeMovie;
    };

    useEffect(() => {
        if (email) {
            setMoviesList(authCtx.user?.movies || []);
        }
    }, [id, email]);

    useEffect(() => {
        getAllMoviesFromDb().then((movies) => {
            if (!movies) return;
            setStoreMoviesList(movies);
        });
    }, []);

    const value = {
        storeMovies: storeMoviesList,
        moviesList,
        addMovie,
        deleteMovie,
        editMovie,
        getUserMovie,
        getStoreMovie,
        addMovieToStore,
    };

    return <MovieContext.Provider value={value}>{props.children}</MovieContext.Provider>;
};

export default MovieContext;
