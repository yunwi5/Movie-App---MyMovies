import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Display/Home";
import About from "./pages/Display/About";
import Store from "./pages/Display/Store";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Movies from "./pages/Movies/Movies";
import MoviesSearch from "./pages/Movies/MoviesSearch";
import MovieAdd from "./pages/Movies/MovieAdd";
import Auth from "./pages/Auth";
import MovieDetailPage from "./pages/Movies/MovieDetailPage";
import NotFound from "./pages/NotFound";

import Authcontext from "./store/auth-context";

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
				<Route path="/movie-store" element={<Store />} />

				{isLoggedIn && <Route path="/movies" element={<Movies />} />}
				{isLoggedIn && <Route path="/movies/:searchWord" element={<MoviesSearch />} />}
				{isLoggedIn && <Route path="/add-movie" element={<MovieAdd />} />}
				{isLoggedIn && <Route path="/movie-detail/:movieId" element={<MovieDetailPage />} />}

				<Route path="/auth/*" element={<Auth />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
