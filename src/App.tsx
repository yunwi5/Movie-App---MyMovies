import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Display/Home";
import About from "./pages/Display/About";
import StorePage from "./pages/Display/StorePage";
import SingleStorePage from "./pages/Display/SingleStorePage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import UserMoviesList from "./pages/Movies/UserMoviesList";
import MoviesSearch from "./pages/Movies/MoviesSearch";
import MovieAdd from "./pages/Movies/MovieAdd";
import Auth from "./pages/Auth";
import MovieDetailStore from "./pages/Movies/MovieDetailStore";
import MovieDetailUser from "./pages/Movies/MovieDetailUser";
import MovieEditPage from "./pages/Movies/MovieEditPage";
import AdminPage from "./pages/Admin/AdminPage";
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
				{/* Store movies do not need login to watch. Need to fix later on */}
				<Route path="/movie-store" element={<StorePage />} />
				<Route
					path="/movie-store/:genreName"
					element={<SingleStorePage />}
				/>

				{isLoggedIn && (
					<Route path="/movies" element={<UserMoviesList />} />
				)}
				{isLoggedIn && (
					<Route path="/store-movies" element={<MoviesSearch />} />
				)}

				{isLoggedIn && (
					<Route path="/add-movie" element={<MovieAdd />} />
				)}
				<Route
					path="/movie-detail/store/:movieId"
					element={<MovieDetailStore />}
				/>
				{isLoggedIn && (
					<Route
						path="/movie-detail/user/:movieId"
						element={<MovieDetailUser />}
					/>
				)}
				{isLoggedIn && (
					<Route
						path="/movie-edit/:movieId"
						element={<MovieEditPage />}
					/>
				)}

				{isLoggedIn && <Route path="/admin" element={<AdminPage />} />}

				<Route path="/auth/*" element={<Auth />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
