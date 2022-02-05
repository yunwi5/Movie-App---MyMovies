import React, { useContext } from "react";
import MovieContext from "../../../store/movie-context";
import Movie from "../../../models/Movie";
import MovieScrollbar from "./MovieScrollbar";
import { getDarkenBackground } from "../../../utilities/design-util/style-util";
import { getGenreImgUrls } from "../../../assets/genre-img";
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
	const { movies, genre } = singleGenreStore;
	const movieCtx = useContext(MovieContext);
	const storeMovies = movieCtx.storeMovies;

	const concatedMovies = concatUniqueMovies(movies, storeMovies);
	const moviesCount = movies.length;

	const [ imageOne, imageTwo ] = getGenreImgUrls(genre as any);

	// Use this Style Object if Background Image is needed.
	const backgroundStyle1 = getDarkenBackground(imageOne);
	const backgroundStyle2 = getDarkenBackground(imageTwo);

	const suggestedMovies = [ ...concatedMovies ];
	const highestRatedMovies =
		sortMovies([ ...concatedMovies ], SortingStandard.RATING, Direction.DESCENDING) ||
		concatedMovies;
	const newestMovies =
		sortMovies([ ...concatedMovies ], SortingStandard.YEAR, Direction.DESCENDING) ||
		concatedMovies;

	// Uses several scroll bars.
	return (
		<main className="single-genre-store">
			<section className="genre-section genre-section--long">
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

				{/* 2 background images */}
				<div className="bg bg-1" style={backgroundStyle1} />
				<div className="bg bg-2" style={backgroundStyle2} />
			</section>
		</main>
	);
};

export default SingleGenreStore;
