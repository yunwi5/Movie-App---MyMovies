import React, { useContext, useState, useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Movie from "../../../models/Movie";
import MovieContext from "../../../store/movie-context";
import sortMovies, {
	filterMovies,
	SortingStandard,
	Direction
} from "../../../utilities/movie-util/movies-util";
import SearchAutoComplete from "./SearchAutoComplete";

interface Props {
	onSearch: (searchText: string) => void;
}

const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";
const BACKSPACE = "Backspace";

const MainSearchbar: React.FC<Props> = (props) => {
	const { onSearch } = props;
	const [ text, setText ] = useState("");
	const [ position, setPosition ] = useState<number | null>(null);
	// Active text on the searchbar by user hover down the search list.
	// This is separate  from searchText, so that user can navigate back to their original
	// text when they move/scroll back to null position by pressing Arrow UP Key.
	const [ activeMovieTitle, setActiveMovieTitle ] = useState<string | null>(null);
	const [ showAutoSearch, setShowAutoSerach ] = useState(true);

	const inititalMovies = useContext(MovieContext).storeMovies;
	const [ searchedMovies, setSearchedMovies ] = useState<Movie[]>([]);

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(activeMovieTitle || text);
		setShowAutoSerach(false);
	};

	const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowAutoSerach(true);
		const newText = e.target.value;
		setText(newText);
		if (newText) {
			const searchedMovies = filterMovies(inititalMovies, newText.trim());
			const popularOnes = sortMovies(
				searchedMovies,
				SortingStandard.RATING,
				Direction.DESCENDING
			).slice(0, 8);
			setSearchedMovies(popularOnes);
		} else {
			setSearchedMovies([]);
		}
	};

	const searchPositionHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === BACKSPACE) {
			setPosition(null);
			return;
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
	};

	useEffect(
		() => {
			if (position === null || position === undefined) {
				setText(
					activeMovieTitle ? activeMovieTitle.slice(0, activeMovieTitle.length - 1) : text
				);
				setActiveMovieTitle(null);
				return;
			}

			const movieTitle = searchedMovies[position].title;
			if (movieTitle) {
				setActiveMovieTitle(movieTitle);
			}
		},
		[ position, searchedMovies, activeMovieTitle, text ]
	);

	const clickAwayHandler = () => {
		setShowAutoSerach(false);
	};

	const clearTextHandler = () => {
		setText("");
		setActiveMovieTitle(null);
		setPosition(null);
		setSearchedMovies([]);
	};

	return (
		<ClickAwayListener onClickAway={clickAwayHandler}>
			<form className="header__nav-search" onSubmit={submitHandler}>
				<i className="fa fa-search" />
				<input
					type="text"
					placeholder="Search movie on store!"
					value={activeMovieTitle || text}
					onChange={textChangeHandler}
					onKeyDown={searchPositionHandler}
				/>
				{text && (
					<span className="exit-icon-wrapper" onClick={clearTextHandler}>
						<i className="fa fa-times" />
					</span>
				)}

				{showAutoSearch &&
				searchedMovies.length > 0 && (
					<div className="auto-complete-search">
						<h4 className="search-heading">Popular Movies</h4>
						<SearchAutoComplete
							searchText={text}
							items={searchedMovies}
							position={position}
							onSearch={onSearch}
						/>
					</div>
				)}
			</form>
		</ClickAwayListener>
	);
};

export default MainSearchbar;
