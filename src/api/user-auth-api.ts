import DUMMY_MOVIES from "../assets/storeMovies";
import User from "../models/User";
import Movie from "../models/Movie";
import {
	toUserMovies,
	toMoviesArray
} from "../utilities/movie-util/movies-util";

// UPDATED
export const API_KEY = "AIzaSyDTZ0QbMDjcR020EQXdsQ7KSOcfJwPT7vQ";
export const FIREBASE_DOMAIN =
	"https://react-movie-app-336f6-default-rtdb.firebaseio.com";

// This Fn is called when the new user is signed in!
export const addUser = async (enteredName: string, enteredEmail: string) => {
	console.log("Try adding user!");
	const amountBooksToAdd = Math.floor(Math.random() * 7) + 2;

	const res2 = await fetch(`${FIREBASE_DOMAIN}/users.json`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			userName: enteredName,
			email: enteredEmail,
			movies: toUserMovies(DUMMY_MOVIES, amountBooksToAdd)
		})
	});
	if (res2.ok) {
		console.log("username storing successful!");
	} else {
		const data = await res2.json();
		console.log(data);
		alert("username store went wrong");
	}
};

// For retrieving usrename given the email entered by the user in the login page.
// Need UserId to do that!!!
// Call after the first time when the user is already logged in, but instead refreshes the screen.
export const getUserById = async (userId: string) => {
	// console.log("call api getUserById");
	const response = await fetch(`${FIREBASE_DOMAIN}/users/${userId}.json`);
	const data = await response.json();

	if (!response.ok) {
		throw new Error("Get User went wrong!");
	}

	console.log("getUserById user:", data);
	const { email, userName, movies } = data;

	// Movies can be either Array or Object.
	const moviesArray: Movie[] = toMoviesArray(movies);

	let transformedUser: User = {
		id: userId,
		email,
		userName,
		movies: moviesArray
	};

	return transformedUser;
};

// Called first fime when the user logged in.
// This Fn should be paired with getAllUsers() Fn.
export async function getUserBySearch (inputEmail: string) {
	console.log("call api getUserBySearch");
	const allUsers = await getAllUsers();
	let userFound;
	for (const u of allUsers) {
		if (u.email === inputEmail) {
			userFound = u;
		}
	}

	if (!userFound) {
		console.log(`User email ${inputEmail} is not found!`);
		return null;
	}

	const { id, email, userName, movies } = userFound;
	const moviesArray = toMoviesArray(movies);

	let transformedUser: User = {
		id,
		email,
		userName,
		movies: moviesArray
	};

	return transformedUser;
}

// Get all user obj as an array.
export async function getAllUsers () {
	const response = await fetch(`${FIREBASE_DOMAIN}/users.json`);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Could not fetch movies.");
	}

	const transformedUsers = [];

	for (const key in data) {
		const userObj = {
			id: key,
			...data[key]
		};

		transformedUsers.push(userObj);
	}

	return transformedUsers;
}
