import Movie from "../models/Movie";
import { FIREBASE_DOMAIN } from "./user-auth-api";
import { toMoviesArray, toMoviesObject } from "../utilities/movie-util/movies-util";

export const STORE_MOVIES_KEY = "-MuxOnh92osEeOMsMEre";

// GET
export async function getAllMoviesFromDb () {
	try {
		const getUrl = `${FIREBASE_DOMAIN}/movies/${STORE_MOVIES_KEY}.json`;

		const res = await fetch(getUrl);
		const data = await res.json();

		let moviesArray: Movie[] = [];
		if (res.ok) {
			console.log("Fetching movies successful!");
			moviesArray = toMoviesArray(data);
			// console.log("moviesArray:");
			// console.table(moviesArray);
		} else {
			console.log("Fetching movies unsuccessful...");
			throw new Error(data.message || "Something went wrong in retrieving movies from DB");
		}
		return moviesArray;
	} catch (err) {
		console.error(err);
	}
}

// POST
// Add all movies at once
export async function addAllMoviesToDb (movies: Movie[]) {
	try {
		const moviesObj = toMoviesObject(movies);
		// Post All the movies at once.
		const postUrl = `${FIREBASE_DOMAIN}/movies.json`;

		const res = await fetch(postUrl, {
			method: "POST",
			body: JSON.stringify(moviesObj),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await res.json();

		if (res.ok) {
			console.log("Movies Post successful!");
		} else {
			console.log("Movies Post unsuccessful...");
			throw new Error(data.message || "Something went wrong in Movies POST");
		}
	} catch (err) {
		console.error(err);
	}
}

// Add a single movie
export async function addSingleMovieToDb (movie: Movie) {
	try {
		const postUrl = `${FIREBASE_DOMAIN}/movies/${STORE_MOVIES_KEY}.json`;
		const res = await fetch(postUrl, {
			method: "POST",
			body: JSON.stringify(movie),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await res.json();

		if (res.ok) {
			console.log("New movie added to DB successfully!");
		} else {
			console.log("New movie was not added successfully...");
			throw new Error(data.message || "Movie POST unsucessful...");
		}
	} catch (err) {
		console.error(err);
	}
}
