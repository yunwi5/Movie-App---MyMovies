import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import Authcontext from "./store/auth-context";
import Home from "./pages/Display/Home";
import About from "./pages/Display/About";
import StorePage from "./pages/Store/StorePage";
import GenreStorePage from "./pages/Store/GenreStorePage";
import ProducerStorePage from "./pages/Store/ProducerStorePage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import UserMoviesList from "./pages/Movies/UserMoviesList";
import MoviesSearch from "./pages/Movies/MoviesSearch";
import MovieAdd from "./pages/Movies/MovieAdd";
import Auth from "./pages/Auth/Auth";
import MovieDetailStore from "./pages/Movies/MovieDetailStore";
import MovieDetailUser from "./pages/Movies/MovieDetailUser";
import MovieEditPage from "./pages/Movies/MovieEditPage";
import MovieEvaluationPage from "./pages/Movies/MovieEvaluationPage";
import AdminPage from "./pages/Admin/AdminPage";
import NotFound from "./pages/NotFound";

import Logo from "./assets/Images/MyMovies_Logo.png";

function App () {
	const authCtx = useContext(Authcontext);
	const isLoggedIn = authCtx.isLoggedIn;

	return (
		<div className="App">
			<Helmet>
				<title>MyMovies</title>
				<link rel="icon" type="image/png" href={Logo} />
			</Helmet>
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				{/* Store movies do not need login to watch. Need to fix later on */}
				<Route path="/movie-store" element={<StorePage />} />
				<Route path="/movie-store/genre/:genreName" element={<GenreStorePage />} />
				<Route path="/movie-store/producer/:producerName" element={<ProducerStorePage />} />

				{<Route path="/store-movies" element={<MoviesSearch />} />}
				{isLoggedIn && <Route path="/movies" element={<UserMoviesList />} />}

				<Route path="/movie-detail/store/:movieId" element={<MovieDetailStore />} />
				{isLoggedIn && <Route path="/add-movie" element={<MovieAdd />} />}
				{isLoggedIn && (
					<Route path="/movie-detail/user/:movieId" element={<MovieDetailUser />} />
				)}
				{isLoggedIn && <Route path="/movie-edit/:movieId" element={<MovieEditPage />} />}
				{isLoggedIn && (
					<Route path="/movie-evaluate/:movieId" element={<MovieEvaluationPage />} />
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
