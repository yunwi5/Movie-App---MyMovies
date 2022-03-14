import React, { useState, useEffect, useCallback } from "react";
import MovieRating from "./MovieRating";
import MovieGenre from "./MovieGenre";
import { GenreList } from "../../../models/Movie";

interface Props {
	onRatingCount: (ratingThreshold: number) => number;
	onGenreCount: (genreName: string) => number;
	isForUser: boolean;
	onFilterRating: React.Dispatch<React.SetStateAction<number>>;
	onFilterGenres: React.Dispatch<React.SetStateAction<string[]>>;
	filterRating: number;
	filterGenres: string[];
}

const MovieFilter: React.FC<Props> = (props) => {
	const {
		onRatingCount,
		onGenreCount,
		isForUser,
		onFilterRating,
		onFilterGenres,
		filterRating,
		filterGenres
	} = props;

	const [ ratingsCount, setRatingsCount ] = useState({
		3: 0,
		5: 0,
		7: 0,
		9: 0
	});

	const [ genresCount, setGenresCount ] = useState<number[]>([]);

	// Control Open/Close of filter section
	const [ showRatingFilter, setShowRatingFilter ] = useState(true);
	const [ showGenreFilter, setShowGenreFilter ] = useState(true);
	// const [ showFavoriteFilter, setShowFavoriteFilter ] = useState<boolean>(isForUser);

	const [ clearFilters, setClearFilters ] = useState(false);

	const filterRatingHandler = (ratingValue: number) => {
		onFilterRating(ratingValue);
	};

	const filterGenreHandler = useCallback(
		(inputGenre: string) => {
			if (filterGenres.includes(inputGenre)) {
				// If the genre is in the array, deselect it by removing from this array
				const newFilterGenres = filterGenres.filter((genre) => genre !== inputGenre);
				onFilterGenres(newFilterGenres);
			} else {
				const newFilterGenres = [ ...filterGenres, inputGenre ];
				onFilterGenres(newFilterGenres);
			}
		},
		[ filterGenres, onFilterGenres ]
	);

	useEffect(
		() => {
			const countRatings = {
				3: onRatingCount(3),
				5: onRatingCount(5),
				7: onRatingCount(7),
				9: onRatingCount(9)
			};
			setRatingsCount(countRatings);

			const newGenreCounts = GenreList.map((genre) => onGenreCount(genre));
			setGenresCount(newGenreCounts);
		},
		[ onGenreCount, onRatingCount ]
	);

	useEffect(
		() => {
			if (!clearFilters) return;
			setClearFilters(false);
			onFilterRating(0);
			onFilterGenres([]);
		},
		[ clearFilters, onFilterGenres, onFilterRating ]
	);

	const showClearFilter = filterRating || filterGenres.length;

	return (
		<aside className="movie-filter">
			{showClearFilter ? <h4 onClick={() => setClearFilters(true)}>Clear Filter</h4> : ""}
			<section
				className={`ratings-filter ${showRatingFilter ? "" : "ratings-filter--close"}`}
			>
				<div className="icon-wrapper" onClick={() => setShowRatingFilter((prev) => !prev)}>
					<i className={`fa fa-chevron-up ${showRatingFilter ? "" : "fa-reverse"}`} />
				</div>
				{isForUser && <h3>Your Ratings</h3>}
				{!isForUser && <h3>IMDB Ratings</h3>}
				<ul className="ratings-filter__list">
					<MovieRating
						value={9}
						count={ratingsCount[9]}
						onCheck={filterRatingHandler}
						clear={clearFilters}
					/>
					<MovieRating
						value={7}
						count={ratingsCount[7]}
						onCheck={filterRatingHandler}
						clear={clearFilters}
					/>
					<MovieRating
						value={5}
						count={ratingsCount[5]}
						onCheck={filterRatingHandler}
						clear={clearFilters}
					/>
					<MovieRating
						value={3}
						count={ratingsCount[3]}
						onCheck={filterRatingHandler}
						clear={clearFilters}
					/>
				</ul>
			</section>
			<section className={`genres-filter ${showGenreFilter ? "" : "genres-filter--close"}`}>
				<div className="icon-wrapper" onClick={() => setShowGenreFilter((prev) => !prev)}>
					<i className={`fa fa-chevron-up ${showGenreFilter ? "" : "fa-reverse"}`} />
				</div>
				<h3>Genre (13)</h3>
				<ul className="genres-filter__list">
					{GenreList.map((genre, idx) => (
						<MovieGenre
							key={idx}
							name={genre}
							count={genresCount[idx]}
							onCheck={filterGenreHandler}
							clear={clearFilters}
						/>
					))}
				</ul>
			</section>
		</aside>
	);
};

export default MovieFilter;
