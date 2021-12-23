import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export const AuthContextProvider: React.FC = (props) => {
	const navigate = useNavigate();

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
		navigate("/home");
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
