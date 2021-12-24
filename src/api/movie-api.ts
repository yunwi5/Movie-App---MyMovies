import Movie from "../models/Movie";
import { FIREBASE_DOMAIN } from "./user-api";

/* 
Movie API is to add movie to user movie list, and remove movie from it.
*/

// POST
export async function addMovieToUser (userId: string, movie: Movie) {
	try {
		const postUrl = `${FIREBASE_DOMAIN}/users/${userId}/movies.json`;
		const res = await fetch(postUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(movie)
		});

		const data = await res.json();
		if (res.ok) {
			console.log(`Movie ${movie.title} Added to the user successfully!`);
		} else {
			console.log(`POST Request unsuccessful. data: ${data}`);
			throw new Error("Movie added was not successful!");
		}
	} catch (e) {
		console.error(e);
	}

	return;
}

// DELETE
export async function deleteMovieFromUser (userId: string, movie: Movie) {
	// Send DELETE REQUEST to the surver.
	if (!movie.key || !(movie.key.length > 0)) return;

	try {
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
// Not being used yet. Need to implement EDIT functionality first.
export async function putUserMovie (userId: string, movie: Movie) {
	// Send PUT REQUEST to the surver.
	if (!movie.key || !(movie.key.length > 0)) return;

	try {
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
