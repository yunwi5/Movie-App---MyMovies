import React, { Suspense, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Authcontext from './store/auth-context';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
// import Home from './pages/Display/Home';
// import About from './pages/Display/About';
// import StorePage from './pages/Store/StorePage';
// import GenreStorePage from './pages/Store/GenreStorePage';
// import ProducerStorePage from './pages/Store/ProducerStorePage';
// import UserMoviesList from './pages/Movies/UserMoviesList';
// import MoviesSearch from './pages/Movies/MoviesSearch';
// import MovieAddPage from './pages/Movies/Updates/MovieAddPage';
// import Auth from './pages/Auth/Auth';
// import MovieDetailStore from './pages/Movies/Details/MovieDetailStore';
// import MovieDetailUser from './pages/Movies/Details/MovieDetailUser';
// import MovieEditPage from './pages/Movies/Updates/MovieEditPage';
// import MovieEvaluationPage from './pages/Movies/Updates/MovieEvaluationPage';
// import AdminPage from './pages/Admin/AdminPage';
// import NotFound from './pages/NotFound';

import { userIsAdmin } from './utilities/admin-util';
import Logo from './assets/Images/MyMovies_Logo.png';
import LoadingSpinner from './components/UI/DesignElement/LoadingSpinner';
import ScrollToTop from './components/UtilityComponents/ScrollToTop';

const HomePage = React.lazy(() => import('./pages/Display/Home'));
const AboutPage = React.lazy(() => import('./pages/Display/About'));

const StorePage = React.lazy(() => import('./pages/Store/StorePage'));
const GenreStorePage = React.lazy(() => import('./pages/Store/GenreStorePage'));
const ProducerStorePage = React.lazy(() => import('./pages/Store/ProducerStorePage'));

const MovieEvaluationPage = React.lazy(() => import('./pages/Movies/Updates/MovieEvaluationPage'));
const MovieEditPage = React.lazy(() => import('./pages/Movies/Updates/MovieEditPage'));
const MoviesSearch = React.lazy(() => import('./pages/Movies/MoviesSearch'));
const UserMoviesListPage = React.lazy(() => import('./pages/Movies/UserMoviesList'));
const MovieAddPage = React.lazy(() => import('./pages/Movies/Updates/MovieAddPage'));

const MovieDetailUserPage = React.lazy(() => import('./pages/Movies/Details/MovieDetailUser'));
const MovieDetailStorePage = React.lazy(() => import('./pages/Movies/Details/MovieDetailStore'));

const AuthPage = React.lazy(() => import('./pages/Auth/Auth'));
const AdminPage = React.lazy(() => import('./pages/Admin/AdminPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

function App() {
    const authCtx = useContext(Authcontext);
    const { isLoggedIn, user } = authCtx;
    const isAdmin = !user ? false : userIsAdmin(user.email) ? true : false;

    return (
        <div className="App">
            <Helmet>
                <title>MyMovies</title>
                <link rel="icon" type="image/png" href={Logo} />
            </Helmet>
            <Header />
            <ScrollToTop />
            <Suspense
                fallback={
                    <div className="fallback">
                        <LoadingSpinner />{' '}
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Store movies do not need login to watch. Need to fix later on */}
                    <Route path="/movie-store" element={<StorePage />} />
                    <Route path="/movie-store/genre/:genreName" element={<GenreStorePage />} />
                    <Route
                        path="/movie-store/producer/:producerName"
                        element={<ProducerStorePage />}
                    />

                    {<Route path="/store-movies" element={<MoviesSearch />} />}
                    {isLoggedIn && <Route path="/movies" element={<UserMoviesListPage />} />}

                    <Route path="/movie-detail/store/:movieId" element={<MovieDetailStorePage />} />
                    {isLoggedIn && <Route path="/add-movie" element={<MovieAddPage />} />}
                    {isLoggedIn && (
                        <Route
                            path="/movie-detail/user/:movieId"
                            element={<MovieDetailUserPage />}
                        />
                    )}
                    {isLoggedIn && (
                        <Route path="/movie-edit/:movieId" element={<MovieEditPage />} />
                    )}
                    {isLoggedIn && (
                        <Route path="/movie-evaluate/:movieId" element={<MovieEvaluationPage />} />
                    )}

                    {isLoggedIn && isAdmin && <Route path="/admin" element={<AdminPage />} />}

                    <Route path="/auth/*" element={<AuthPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
            <Footer />
        </div>
    );
}

export default App;
