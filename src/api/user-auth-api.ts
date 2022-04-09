import { API_KEY } from './constants';

export async function signUpUser (email: string, password: string) {
	const response = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
		{
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	const data = await response.json();
	return { response, data };
}

export async function logInUser (email: string, password: string) {
	const response = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
		},
	);
	const data = await response.json();
	return { response, data };
}
