import React, { useContext, useState, useEffect, useCallback } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import Movie from '../../../models/Movie';
import MovieContext from '../../../store/movie-context';
import sortMovies, { filterMovies } from '../../../utilities/movie-util/movies-util';
import SearchAutoComplete from './SearchAutoComplete';
import { Direction, SortingStandard } from '../../../models/helperModels';

interface Props {
	onSearch: (searchText: string) => void;
}

const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const BACKSPACE = 'Backspace';

const MainSearchbar: React.FC<Props> = ({ onSearch }) => {
	const [ text, setText ] = useState('');
	const [ position, setPosition ] = useState<number | null>(null);
	// Active text on the searchbar by user hover down the search list.
	// This is separate  from searchText, so that user can navigate back to their original
	// text when they move/scroll back to null position by pressing Arrow UP Key.
	const [ activeMovieTitle, setActiveMovieTitle ] = useState<string | null>(null);

	// Only show auto search when the user is on searching
	const [ showAutoSearch, setShowAutoSerach ] = useState(true);

	const inititalMovies = useContext(MovieContext).storeMovies;
	const [ searchedMovies, setSearchedMovies ] = useState<Movie[]>([]);

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(activeMovieTitle || text);
		setShowAutoSerach(false);
	};

	const textChangeHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setShowAutoSerach(true);
			const newText = e.target.value;
			setText(newText);
			if (newText) {
				const searchedMovies = filterMovies(inititalMovies, newText.trim());
				const popularOnes = sortMovies(
					searchedMovies,
					SortingStandard.RATING,
					Direction.DESCENDING,
				).slice(0, 9);
				setSearchedMovies(popularOnes);
			} else {
				setSearchedMovies([]);
			}
		},
		[ inititalMovies ],
	);

	const clearTextHandler = useCallback(() => {
		setText('');
		setActiveMovieTitle(null);
		setPosition(null);
		setSearchedMovies([]);
	}, []);

	const searchPositionHandler = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === BACKSPACE) {
				setPosition(null);
			}
			if (e.key === ARROW_UP_KEY) {
				setPosition((prev) => {
					if (prev === null) return null;
					return prev === 0 ? null : prev - 1;
				});
			}
			if (e.key === ARROW_DOWN_KEY) {
				setPosition((prev) => {
					if (prev === null) return 0;
					if (prev === searchedMovies.length - 1) return prev;
					return prev + 1;
				});
			}
		},
		[ searchedMovies ],
	);

	const clickAwayHandler = useCallback(() => {
		setShowAutoSerach(false);
	}, []);

	useEffect(
		() => {
			if (position === null || position === undefined) {
				setText(
					activeMovieTitle
						? activeMovieTitle.slice(0, activeMovieTitle.length - 1)
						: text,
				);
				setActiveMovieTitle(null);
				return;
			}

			const movieTitle = searchedMovies[position].title;
			setActiveMovieTitle(movieTitle);
		},
		[ position, searchedMovies, activeMovieTitle, text ],
	);

	return (
		<ClickAwayListener onClickAway={clickAwayHandler}>
			<form className='header__nav-search' onSubmit={submitHandler}>
				<i className='fa fa-search' />
				<input
					type='text'
					placeholder='Search movies on the store'
					value={activeMovieTitle || text}
					onChange={textChangeHandler}
					onKeyDown={searchPositionHandler}
				/>
				{text && (
					<span className='exit-icon-wrapper' onClick={clearTextHandler}>
						<i className='fa fa-times' />
					</span>
				)}

				{showAutoSearch &&
				searchedMovies.length > 0 && (
					<SearchAutoComplete
						searchText={text}
						items={searchedMovies}
						position={position}
						onSearch={onSearch}
					/>
				)}
			</form>
		</ClickAwayListener>
	);
};

export default MainSearchbar;
