import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

const Auth: React.FC = () => {
	return (
		<React.Fragment>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</React.Fragment>
	);
};

export default Auth;
