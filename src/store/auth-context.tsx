import React, { useState } from "react";

interface Props {
	userName: string | null;
	token: string | null;
	isLoggedIn: boolean;
	login: (token: string, userName: string) => void;
	logout: () => void;
}

const authObj: Props = {
	userName: "",
	token: "",
	isLoggedIn: false,
	login: (token: string, userName: string) => {},
	logout: () => {}
};

const AuthContext = React.createContext<Props>(authObj);

const getUserName = async (email: string) => {
	await fetch(`https://react-http-7e82d-default-rtdb.firebaseio.com/users.json`)
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

export const AuthContextProvider: React.FC = (props) => {
	const retrievedToken = localStorage.getItem("token");
	const [ token, setToken ] = useState<string | null>(retrievedToken);

	const [ userName, setUserName ] = useState<string | null>("Jonas");
	const isLoggedIn = !!token;

	const login = (token: string, email: string) => {
		if (!token) return;
		setToken(token);
		// const userName = getUserName(email);
		// setUserName(userName);
		localStorage.setItem("token", token);
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem("token");
	};

	const values = {
		userName,
		token,
		isLoggedIn,
		login,
		logout
	};

	return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
