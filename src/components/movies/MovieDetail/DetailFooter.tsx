import { useNavigate } from "react-router-dom";
import Movie from "../../../models/Movie";
import StoreReviews from "../../Comments/StoreReviews/StoreReviews";

interface Props {
	movie: Movie;
	isFromStore: boolean;
}

const DetailFooter: React.FC<Props> = (props) => {
	const { movie, isFromStore } = props;
	const navigate = useNavigate();

	return (
		<section className="movie-detail__bottom">
			<div className="movie-detail__about">
				<h2>About this movie</h2>
				<p>{movie.description}</p>
			</div>

			{isFromStore && <StoreReviews movie={movie} />}

			<div className="movie-detail__genres">
				<ul>
					{movie.genreList.map((genre, idx) => (
						<li
							onClick={() => navigate(`/movie-store/${genre}`)}
							key={idx}
						>
							{genre}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default DetailFooter;
