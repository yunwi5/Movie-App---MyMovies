import React, { useState } from "react";
import Movie from "../models/Movie";

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

const DUMMY_MOVIES: Movie[] = [
	{
		id: "m1",
		title: "Avengers Endgame",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
		rating: 9.8,
		description: "Avengers final series",
		company: "Marvel Comics",
		duration: 182,
		year: 2019,
		genreList: [ "Action & Adventurs", "Science-Fiction & Fantasy" ],
		isFavorite: false
	},
	{
		id: "m2",
		title: "Avengers Infinity War",
		imgUrl:
			"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRc7qW-K_snQNkkJZ7ZLudrI63KmrUPfVG80OnuCdVMaHHKYovx",
		rating: 8.8,
		description: "Avengers 3rd series",
		company: "Marvel Comics",
		duration: null,
		year: 2018,
		genreList: [ "Action & Adventurs", "Science-Fiction & Fantasy" ],
		isFavorite: false
	},
	{
		id: "m3",
		title: "The Dark Knight",
		imgUrl: "https://contentserver.com.au/assets/598411_p173378_p_v8_au.jpg",
		rating: 9.9,
		description: "Dark Knight 1st Series",
		company: "DC Comics",
		duration: null,
		year: 2009,
		genreList: [ "Action & Adventurs", "Thriller" ],
		isFavorite: false
	},
	{
		id: "m4",
		title: "Spider-Main Homecoming",
		imgUrl:
			"https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fmarkhughes%2Ffiles%2F2017%2F07%2FSPIDER-MAN-HOMECOMING-poster-10-1200x1777.jpg",
		rating: 9.0,
		description: "A new Spider-Man series",
		company: "Marvel Comics",
		duration: null,
		year: 2017,
		genreList: [ "Action & Adventurs" ],
		isFavorite: false
	},
	{
		id: "m5",
		title: "The Suicide Squad",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_.jpg",
		rating: 7,
		description:
			"The government sends the most dangerous supervillains in the world -- Bloodsport, Peacemaker, King Shark, Harley Quinn and others -- to the remote, enemy-infused island of Corto Maltese. Armed with high-tech weapons, they trek through the dangerous jungle on a search-and-destroy mission, with only Col. Rick Flag on the ground to make them behave.",
		company: "DC Comics",
		duration: 132,
		year: 2016,
		genreList: [ "Action & Adventurs" ],
		isFavorite: false
	}
];

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
