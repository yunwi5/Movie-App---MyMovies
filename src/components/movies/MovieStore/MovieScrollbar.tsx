import { Fragment, useEffect, useState, useLayoutEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Movie from '../../../models/Movie';
import { shuffleList } from '../../../utilities/list-util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faShuffle } from '@fortawesome/pro-light-svg-icons';
import PosterCard from './PosterCard';

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
		(numMovies * moviePosterWidth + numMovies * colGap) / scrollAmount,
	);
	const minScrollIndex = useMemo(() => Math.min(-(maxScrollPosition - 2), 0), [
		maxScrollPosition,
	]);

	const listStyle = {
		left: `${currentScrollPosition * 51.05}%`,
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
		[ currentScrollPosition, minScrollIndex ],
	);

	const shuffleListHandler = () => {
		const newShuffledMovies = shuffleList(shuffledMovies);
		setShuffledMovies(newShuffledMovies);
		setCurrentScrollPosition(0);
	};

	useEffect(
		() => {
			setShuffledMovies(movies);
			setCurrentScrollPosition(0);
		},
		[ movies ],
	);

	return (
		<div className='movie-box'>
			<p className='movie-box__heading'>
				<span className='label'>{listTag}</span>{' '}
				{showLinkAndShuffle && (
					<Fragment>
						{genre && (
							<Link to={`/movie-store/genre/${genre}`} className='link'>
								See More
							</Link>
						)}

						<span className='btn-shuffle' onClick={shuffleListHandler}>
							Shuffle
							<FontAwesomeIcon
								className='btn-shuffle__icon'
								icon={faShuffle as IconProp}
							/>
						</span>
					</Fragment>
				)}
			</p>
			<div className='posters-container'>
				<button
					className={`horizontal-scroll ${leftScrollIsValid
						? ''
						: 'horizontal-scroll--invalid'}`}
				>
					<FontAwesomeIcon
						icon={faChevronLeft as IconProp}
						onClick={horizontalScrollHandler.bind(null, 1)}
					/>
				</button>

				<button
					className={`horizontal-scroll ${rightScrollIsValid
						? ''
						: 'horizontal-scroll--invalid'}`}
					onClick={horizontalScrollHandler.bind(null, -1)}
				>
					<FontAwesomeIcon icon={faChevronRight as IconProp} />
				</button>
				<ul className='posters-list' style={listStyle}>
					{shuffledMovies.map((movie) => <PosterCard key={movie.id} movie={movie} />)}
				</ul>
			</div>
		</div>
	);
};

export default MovieScrollbar;
