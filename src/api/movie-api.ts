import Movie from "../models/Movie";
import { FIREBASE_DOMAIN } from "./user-api";

/* 
Movie API is to add movie to user movie list, and remove movie from it.
*/

// POST
export async function addMovieToUser (userId: string, movie: Movie) {
	let movieKey: string | undefined = undefined;

	try {
		const postUrl = `${FIREBASE_DOMAIN}/users/${userId}/movies.json`;
		const res = await fetch(postUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(movie)
		});

		const data = await res.json(); // data in the format { name: string }
		movieKey = data.name;

		if (res.ok) {
			console.log(`Movie ${movie.title} Added to the user successfully!`);
		} else {
			console.log(`POST Request unsuccessful. data: ${data}`);
			throw new Error("Movie added was not successful!");
		}
	} catch (e) {
		console.error(e);
	}

	return movieKey;
}

// DELETE
export async function deleteMovieFromUser (userId: string, movie: Movie) {
	// Send DELETE REQUEST to the surver.

	try {
		if (!movie.key || !(movie.key.length > 0)) throw new Error("Movie key is not even defined!");
		const deleteUrl = `${FIREBASE_DOMAIN}/users/${userId}/movies/${movie.key}.json`;
		const response = await fetch(deleteUrl, {
			method: "DELETE"
		});

		const data = response.json();
		if (response.ok) {
			console.log("DELETE request successsful!");
		} else {
			console.log("DELETE not ok. data:", data);
			throw new Error("DELETE was not successful");
		}
	} catch (e) {
		console.error(e);
	}

	return;
}

// PUT
// Being used for isFavorite property modification at the moment.
export async function putUserMovie (userId: string, movie: Movie) {
	// Send PUT REQUEST to the surver.
	try {
		if (!movie.key || !(movie.key.length > 0)) throw new Error("This movie does not have key!");

		const putUrl = `${FIREBASE_DOMAIN}/users/${userId}/movies/${movie.key}.json`;
		const response = await fetch(putUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(movie)
		});

		const data = await response.json();
		if (response.ok) {
			console.log("PUT Request successful!");
			console.log(`movie ${movie.title} was modified successfully!`);
		} else {
			console.log("PUT request unsuccessful. Data:", data);
			throw new Error("Something went wrong in PUT Request");
		}
	} catch (e) {
		console.error(e);
	}

	return;
}

// PUT
export async function putAllUserMovies (userId: string, movies: Movie[]) {
	// Send PUT REQUEST to the surver.
	try {
		const putUrl = `${FIREBASE_DOMAIN}/users/${userId}/movies/.json`;
		const response = await fetch(putUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(movies)
		});

		const data = await response.json();
		if (response.ok) {
			console.log("PUT Request successful!");
			console.log(`All movies were added successfully!`);
		} else {
			console.log("PUT request unsuccessful. Data:", data);
			throw new Error("Something went wrong in PUT Request");
		}
	} catch (e) {
		console.error(e);
	}

	return;
}
