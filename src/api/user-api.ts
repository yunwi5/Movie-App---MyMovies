import DUMMY_MOVIES from "../assets/storeMovies";

export const FIREBASE_DOMAIN = "https://react-http-7e82d-default-rtdb.firebaseio.com";

export const addUser = async (enteredName: string, enteredEmail: string) => {
	console.log("Try adding user!");
	const res2 = await fetch(`${FIREBASE_DOMAIN}/users.json`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			userName: enteredName,
			email: enteredEmail,
			movies: DUMMY_MOVIES.slice(0, 2)
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

// Get all users
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

// For retrieving usrename given the email entered by the user in the login page.
// Currently not being used.
// Need UserId to do that!!!
export const getUser = async (userId: string) => {
	await fetch(`https://react-http-7e82d-default-rtdb.firebaseio.com/users/${userId}.json`)
		.then((res) => {
			if (res.ok) {
				console.log("Request SuccessfuL!");
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log("Error occued while fetching userName", err);
		});
	return "Jonas";
};
