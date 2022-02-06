import React from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";

const Auth: React.FC = () => {
	return (
		<React.Fragment>
			<Helmet>
				<title>Sign In | Sign Up</title>
				<meta
					name="description"
					content="Sign Up for MyMovies to start your Movie Collection!"
				/>
			</Helmet>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</React.Fragment>
	);
};

export default Auth;
