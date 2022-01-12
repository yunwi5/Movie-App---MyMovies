import React, { useContext } from "react";
import MovieContext from "../../../store/movie-context";
import Movie from "../../../models/Movie";
import MovieScrollbar from "./MovieScrollbar";
import sortMovies, {
	Direction,
	SortingStandard,
	concatUniqueMovies
} from "../../../utilities/movie-util/movies-util";

interface Props {
	singleGenreStore: {
		imgUrl: string;
		movies: Movie[];
		genre: string;
	};
}

const SingleGenreStore: React.FC<Props> = ({ singleGenreStore }) => {
	const { movies, imgUrl, genre } = singleGenreStore;
	const movieCtx = useContext(MovieContext);
	const storeMovies = movieCtx.storeMovies;

	const concatedMovies = concatUniqueMovies(movies, storeMovies);
	const moviesCount = movies.length;

	// Use this Style Object if Background Image is needed.
	const backgroundStyle = {
		backgroundImage: `linear-gradient(to right,
	        rgba(20, 20, 20, .9),
	        rgba(30, 30, 30, .85),
	        rgba(35, 35, 35, .7),
	         rgba(40, 40, 40, .6),
	         rgba(230, 230, 230, .07),
	         rgba(40, 40, 40, .6),
	        rgba(35, 35, 35, .7),
	        rgba(30, 30, 30, .85),
	         rgba(20, 20, 20, .9)),
	           url(${imgUrl})`
	};

	const suggestedMovies = [ ...concatedMovies ];
	const highestRatedMovies =
		sortMovies(
			[ ...concatedMovies ],
			SortingStandard.RATING,
			Direction.DESCENDING
		) || concatedMovies;
	const newestMovies =
		sortMovies(
			[ ...concatedMovies ],
			SortingStandard.YEAR,
			Direction.DESCENDING
		) || concatedMovies;

	// Uses several scroll bars.
	return (
		<main className="single-genre-store">
			<section
				className="genre-section genre-section--long"
				style={backgroundStyle}
			>
				{/* <div className="background-img" style={backgroundStyle} /> */}
				<h1 className="heading">
					{genre} <br /> <p>({moviesCount}+ Movies)</p>
				</h1>

				<MovieScrollbar
					movies={newestMovies}
					genre={genre}
					listTag={"Hot & Newest"}
					showLinkAndShuffle={false}
				/>
				<MovieScrollbar
					movies={highestRatedMovies}
					genre={genre}
					listTag={"Highest Rated"}
					showLinkAndShuffle={false}
				/>
				<MovieScrollbar
					movies={suggestedMovies}
					genre={genre}
					listTag={"Suggestion For You"}
					showLinkAndShuffle={false}
				/>
			</section>
		</main>
	);
};

export default SingleGenreStore;
