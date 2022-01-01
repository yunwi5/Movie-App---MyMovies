import { useContext } from "react";
import MovieContext from "../../../store/movie-context";
import Movie from "../../../models/Movie";
import MovieScrollbar from "./MovieScrollbar";
import { concatUniqueMovies } from "../../../utilities/movies-util";

interface Props {
	movies: Movie[];
	genre: string;
	imgUrl: string;
}

const GenreSection: React.FC<Props> = (props) => {
	const { movies, genre, imgUrl } = props;
	const movieCtx = useContext(MovieContext);
	const storeMovies = movieCtx.storeMovies;
	const concatedMovies = concatUniqueMovies(movies, storeMovies);

	const backgroundStyle = {
		backgroundImage: `linear-gradient(to right, 
            rgba(20, 20, 20, .9), 
            rgba(30, 30, 30, .85), 
             rgba(40, 40, 40, .8),
             rgba(230, 230, 230, .07),
             rgba(40, 40, 40, .8),
            rgba(30, 30, 30, .85), 
             rgba(20, 20, 20, .9)), 
               url(${imgUrl})`,
		backgroundSize: "cover"
	};

	const moviesCount = movies.length;

	return (
		<section style={backgroundStyle} className="genre-section">
			<h1 className="heading">{genre}</h1>
			{/* <h3 className="sub-heading">{moviesCount}+ Movies</h3> */}
			<MovieScrollbar
				movies={concatedMovies}
				genre={genre}
				listTag={`Featured Movies (${moviesCount})`}
				showLinkAndShuffle={true}
			/>
		</section>
	);
};

export default GenreSection;
