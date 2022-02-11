import Movie from "../../../models/Movie";
import MovieScrollbar from "./MovieScrollbar";
import { getDarkenBackground } from "../../../utilities/design-util/style-util";

interface Props {
	movies: Movie[];
	genre: string;
	imgUrl: string;
}

const GenreSection: React.FC<Props> = (props) => {
	const { movies, genre, imgUrl } = props;

	// background gradient style object
	const backgroundStyle = getDarkenBackground(imgUrl);
	const moviesCount = movies.length;

	return (
		<section style={backgroundStyle} className="genre-section">
			<h1 className="heading">{genre}</h1>
			<MovieScrollbar
				movies={movies}
				genre={genre}
				listTag={`Featured Movies (${moviesCount})`}
				showLinkAndShuffle={true}
			/>
		</section>
	);
};

export default GenreSection;
