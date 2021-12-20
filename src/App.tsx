import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Movies from "./pages/Movies";
import MoviesSearch from "./pages/MoviesSearch";
import AddMovie from "./pages/AddMovie";
import Auth from "./pages/Auth";
import Authcontext from "./store/auth-context";
import MovieDetail from "./components/movies/MovieDetail";

function App () {
	const authCtx = useContext(Authcontext);
	const isLoggedIn = authCtx.isLoggedIn;

	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				{isLoggedIn && <Route path="/movies" element={<Movies />} />}
				{isLoggedIn && <Route path="/movies/:searchWord" element={<MoviesSearch />} />}
				{isLoggedIn && <Route path="/add-movie" element={<AddMovie />} />}
				<Route path="/auth/*" element={<Auth />} />
				{isLoggedIn && <Route path="/movie-detail/:movieId" element={<MovieDetail />} />}
				<Route path="*" element={<Navigate to="/home" />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
