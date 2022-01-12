import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBySearch, getUserById } from "../api/user-auth-api";
import User from "../models/User";

interface Props {
	token: string | null;
	isLoggedIn: boolean;
	login: (token: string, userName: string) => void;
	logout: () => void;
	user: User | null;
}

const authObj: Props = {
	token: "",
	isLoggedIn: false,
	login: (token: string, userName: string) => {},
	logout: () => {},
	user: { id: "", email: "", userName: "", movies: [] }
};

const AuthContext = React.createContext<Props>(authObj);
export default AuthContext;

const ONE_HOUR = 1000 * 60 * 60;
// Getting user once is enough
// The plan is to fetch all users from Firebase DB, loop through the user to find correct userObj.
// Then, store that target userObj to AuthContext, so that the user properties like
// Email, userName, id, movies can be used for personalized service.
// This can be done by making an independent function named getUserData(email: string)

export const AuthContextProvider: React.FC = (props) => {
	const navigate = useNavigate();

	const retrievedToken = localStorage.getItem("token");
	const retrievedEmail = localStorage.getItem("email");
	const retrievedId = localStorage.getItem("id");

	const [ token, setToken ] = useState<string | null>(retrievedToken);
	const [ email, setEmail ] = useState<string | null>(retrievedEmail);
	const [ userId, setUserId ] = useState<string | null>(retrievedId);

	const [ user, setUser ] = useState<User | null>(null);

	const isLoggedIn = !!token;

	const login = (token: string, email: string) => {
		if (!token) return;
		setToken(token);
		setEmail(email);
		localStorage.setItem("token", token);
		localStorage.setItem("email", email);
	};

	const logout = () => {
		setToken(null);
		setEmail(null);
		setUser(null);
		setUserId(null);
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		localStorage.removeItem("id");
		navigate("/home");
	};

	// Two ways that  gets User from the server.
	const tryGetUserById = async () => {
		const id = localStorage.getItem("id");
		if (!id) return;
		const user = await getUserById(id);
		setUser(user);
	};

	const tryGetUserByEmail = async () => {
		if (token && email) {
			// Get the user Obj from the Database.
			const userFound = await getUserBySearch(email);
			console.log("try get User by email:", userFound);

			if (!userFound) return;
			// Store userId so that user can be retrieved once the user re-loads the page.\
			localStorage.setItem("id", userFound.id);
			setUserId(userFound.id);
			setUser(userFound);
		}
	};

	useEffect(
		() => {
			if (userId) {
				tryGetUserById();
			} else if (email && token) {
				tryGetUserByEmail();
			}
		},
		[ token, email, userId ]
	);

	// Automatically logout the user after 1 hour.
	useEffect(
		() => {
			let timer = setTimeout(() => {
				logout();
			}, ONE_HOUR);

			return () => {
				clearTimeout(timer);
			};
		},
		[ token, email, userId ]
	);

	console.log(
		`token: ${token && token.length}, email: ${email}, id: ${userId}`
	);

	const values = {
		token,
		isLoggedIn,
		login,
		logout,
		user
	};

	return (
		<AuthContext.Provider value={values}>
			{props.children}
		</AuthContext.Provider>
	);
};
