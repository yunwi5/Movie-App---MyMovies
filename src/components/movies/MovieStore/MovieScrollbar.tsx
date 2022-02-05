import { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "../../../models/Movie";
import { shuffleList } from "../../../utilities/list-util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight, faShuffle } from "@fortawesome/pro-light-svg-icons";

interface Props {
	movies: Movie[];
	listTag: string;
	showLinkAndShuffle: boolean;
	genre?: string;
}

const MovieScrollbar: React.FC<Props> = (props) => {
	const { movies, listTag, showLinkAndShuffle, genre } = props;
	const [ currentScrollPosition, setCurrentScrollPosition ] = useState(0);
	const [ leftScrollIsValid, setLeftScrollIsValid ] = useState(true);
	const [ rightScrollIsValid, setRightScrollIsValid ] = useState(true);

	const [ shuffledMovies, setShuffledMovies ] = useState(movies);

	const numMovies = movies.length;
	const moviePosterWidth = 180;
	const colGap = 30;

	const scrollbarWidth = 1440;
	const scrollAmount = scrollbarWidth / 2;
	const maxScrollPosition = Math.ceil(
		(numMovies * moviePosterWidth + numMovies * colGap) / scrollAmount
	);
	const minScrollIndex = Math.min(-(maxScrollPosition - 2), 0);

	const listStyle = {
		left: `${currentScrollPosition * 51.05}%`
	};

	const horizontalScrollHandler = (direction: number) => {
		setCurrentScrollPosition((prev) => prev + direction);
	};

	useLayoutEffect(
		() => {
			if (currentScrollPosition >= 0) {
				setCurrentScrollPosition(0);
				setLeftScrollIsValid(false);
			} else {
				setLeftScrollIsValid(true);
			}
			if (currentScrollPosition <= minScrollIndex) {
				setCurrentScrollPosition(minScrollIndex);
				setRightScrollIsValid(false);
			} else {
				setRightScrollIsValid(true);
			}
		},
		[ currentScrollPosition ]
	);

	const shuffleListHandler = () => {
		const newShuffledMovies = shuffleList(shuffledMovies);
		setShuffledMovies(newShuffledMovies);
	};

	useEffect(
		() => {
			setShuffledMovies(movies);
		},
		[ movies ]
	);

	return (
		<div className="movie-box">
			<p className="movie-box__heading">
				<span className="label">{listTag}</span>{" "}
				{showLinkAndShuffle && (
					<Fragment>
						{genre && (
							<Link to={`/movie-store/genre/${genre}`} className="link">
								See More
							</Link>
						)}

						<span className="btn-shuffle" onClick={shuffleListHandler}>
							Shuffle
							<FontAwesomeIcon
								className="btn-shuffle__icon"
								icon={faShuffle as IconProp}
							/>
						</span>
					</Fragment>
				)}
			</p>
			<div className="posters-container">
				<button
					className={`horizontal-scroll ${leftScrollIsValid
						? ""
						: "horizontal-scroll--invalid"}`}
				>
					<FontAwesomeIcon
						icon={faChevronLeft as IconProp}
						onClick={horizontalScrollHandler.bind(null, 1)}
					/>
				</button>

				<button
					className={`horizontal-scroll ${rightScrollIsValid
						? ""
						: "horizontal-scroll--invalid"}`}
					onClick={horizontalScrollHandler.bind(null, -1)}
				>
					<FontAwesomeIcon icon={faChevronRight as IconProp} />
				</button>
				<ul className="posters-list" style={listStyle}>
					{shuffledMovies.map((movie) => (
						<li key={movie.id} className="movie">
							<div
								className="movie__img"
								style={{
									backgroundImage: `url(${movie.imgUrl})`,
									backgroundSize: "cover"
								}}
							>
								<Link
									to={`/movie-detail/store/${movie.id}`}
									className="movie__btn btn-dark-transparent"
								>
									Explore
								</Link>
							</div>
							{/* <div className="movie__content">
								<h3>{movie.title}</h3>
								<p>
									<span>{toDurationString(movie.duration)}</span>
									<span>{movie.year}</span>
									<span>{movie.rating}</span>
								</p>
							</div> */}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default MovieScrollbar;
