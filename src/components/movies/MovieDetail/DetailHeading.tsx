import { Fragment, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from '../../../models/Movie';
import Rating from '@mui/material/Rating';
import MovieNavIcon from '../MovieSupport/MovieNavIconList';
import MovieSidebar from '../MovieSupport/MovieSidebar';
import { toDurationString } from '../../../utilities/movie-util/movies-util';
import getSimilarMovies from '../../../utilities/movie-util/movies-select-util';

interface Props {
    movie: Movie;
    storeMovies: Movie[];
    onFavorite: () => void;
    onShowAddModal: (askShow: boolean) => void;
    onShowDeleteModal: (askShow: boolean) => void;
}

const DetailHeader: React.FC<Props> = (props) => {
    const { movie, storeMovies, onFavorite, onShowAddModal, onShowDeleteModal } = props;
    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false);

    const [navIsActive, setNavIsActive] = useState(false);
    const [enableBackdrop, setEnableBackdrop] = useState(false);

    const similarMovies = useMemo(() => {
        if (!movie) return;
        const similarMoviesAvailable = getSimilarMovies(storeMovies, movie);
        return similarMoviesAvailable.slice(0, Math.min(similarMoviesAvailable.length, 7));
    }, [movie, storeMovies]);

    // Nav Bar Handling
    let timer: NodeJS.Timeout;

    const toggleNavHandler = () => {
        setNavIsActive((prevState) => !prevState);
        timer = setTimeout(() => {
            setEnableBackdrop(true);
        }, 100);
    };

    const backdropNavHandler = () => {
        if (!enableBackdrop) return;
        setNavIsActive(false);
        setEnableBackdrop(false);
        clearTimeout(timer);
    };

    const isForUser = !movie.isFromStore;
    const durationString = toDurationString(movie.duration);
    const watchUrl = `https://www.netflix.com/search?q=${movie.title}`;
    const moreDetailUrl = `https://en.wikipedia.org/wiki/${movie.title}`;

    return (
        <Fragment>
            {showSidebar && similarMovies && (
                <MovieSidebar
                    movie={movie}
                    storeMovies={storeMovies}
                    onClose={() => setShowSidebar(false)}
                />
            )}
            <section className="movie-detail__top" onClick={backdropNavHandler}>
                {isForUser && (
                    <MovieNavIcon
                        navIsActive={navIsActive}
                        onEdit={() => navigate(`/movie-edit/${movie.id}`)}
                        onEvaluate={() => navigate(`/movie-evaluate/${movie.id}`)}
                        onToggle={toggleNavHandler}
                        onShowSidebar={() => setShowSidebar(true)}
                        onShowModal={() => onShowDeleteModal(true)}
                    />
                )}

                <div className="movie-detail__heading">
                    <div className="img-wrapper">
                        <img src={movie.imgUrl} alt="movie poster" />
                    </div>
                    <div className="heading-content">
                        <h1 className="movie-title">
                            {movie.title}
                            {movie.isFavorite ? <i className="fa fa-bookmark"></i> : ''}
                        </h1>
                        <p className="movie-time">
                            <span className="movie-time__main">
                                {movie.year}
                                {movie.duration && (
                                    <Fragment>
                                        <i className="fa fa-circle" />
                                        {durationString}
                                    </Fragment>
                                )}
                            </span>
                            {movie.duration && (
                                <span className="movie-time__sub">
                                    (&nbsp;{movie.duration} minutes&nbsp;)
                                </span>
                            )}
                        </p>
                        {movie.director && <p className="movie-director"> {movie.director} </p>}
                    </div>
                </div>
                <div className="movie-detail__info">
                    <div className="rating-wrapper wrapper">
                        <Rating
                            className="rating"
                            name="movie-rating"
                            value={movie.rating / 2}
                            readOnly
                        />
                        <span className="rating-text">{movie.rating}/10</span>
                    </div>

                    <div className="producer-wrapper wrapper">
                        <h3>{movie.producer}</h3>
                        <span>Producer</span>
                    </div>

                    <div className="ageRating-wrapper wrapper">
                        <h3>15+</h3>
                        <span>Rating</span>
                    </div>
                </div>

                <div className="movie-detail__links">
                    {isForUser && (
                        <button className="btn btn-favorite" onClick={onFavorite}>
                            {!movie.isFavorite && (
                                <>
                                    <i className="fa fa-star"></i>Favorite
                                </>
                            )}
                            {movie.isFavorite && (
                                <>
                                    <i className="fa fa-star-o"></i>Unfavorite
                                </>
                            )}
                        </button>
                    )}
                    {!isForUser && (
                        <button className="btn btn-add" onClick={() => onShowAddModal(true)}>
                            Collect
                        </button>
                    )}
                    <button className="btn btn-watch">
                        <a href={watchUrl}>Watch</a>
                    </button>
                    <button className="btn btn-more">
                        <a href={moreDetailUrl}>See More</a>
                    </button>
                    {!showSidebar && (
                        <button
                            className="btn-sidebar"
                            onClick={() => setShowSidebar((prev) => !prev)}
                        >
                            <i className="fa fa-film"></i>
                            Similar Movies
                        </button>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export default DetailHeader;
