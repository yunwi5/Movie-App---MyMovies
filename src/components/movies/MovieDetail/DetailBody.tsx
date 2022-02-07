import { useNavigate, Link } from "react-router-dom";
import EvaluationDisplay from "../../Evaluation/EvaluationDisplay/EvaluationDisplay";
import Movie from "../../../models/Movie";
import StoreReviews from "../../Comments/StoreReviews/StoreReviews";

interface Props {
	movie: Movie;
	isFromStore: boolean;
}

const DetailBody: React.FC<Props> = (props) => {
	const { movie, isFromStore } = props;
	const navigate = useNavigate();

	const isForUser = !isFromStore;

	return (
		<section className="movie-detail__bottom">
			<div className="movie-detail__about">
				<h2>About this movie</h2>
				<p>{movie.description}</p>
			</div>

			{isFromStore && <StoreReviews movie={movie} />}
			{isForUser && (
				// movie evaluation summary part
				<EvaluationDisplay movie={movie} />
			)}

			<div className="movie-detail__genres">
				<ul>
					{movie.genreList.map((genre, idx) => (
						<li onClick={() => navigate(`/movie-store/${genre}`)} key={idx}>
							{genre}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default DetailBody;
