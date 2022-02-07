import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

import EvaluationChart from "../Chart/EvaluationChart";
import OverallComment from "./OverallComment";
import EvaluationCriteriaGrid from "./EvaluationCriteriaGrid";

import Movie from "../../../models/Movie";
import { Evaluation, CriteriaList } from "../../../models/Evaluation";
import { createEvaluationList } from "../../../utilities/evaluation-util/evaluation-util";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";

interface Props {
	movie: Movie;
}

const EvaluationDisplay: React.FC<Props> = ({ movie }) => {
	const user = useContext(AuthContext).user;

	if (!user) return <p>You are probably not logged in!</p>;

	let userMovies = user.movies;

	// Evaluation Class Object
	let evaluation = movie.evaluation;
	if (!evaluation) evaluation = new Evaluation();
	const evaluationList = createEvaluationList(evaluation, CriteriaList);

	return (
		<section className="evaluation-display">
			<div className="evaluation-heading">
				<h2>
					<span>Evaluation Summary</span>{" "}
					<Link to={`/movie-evaluate/${movie.id}`} className="link">
						<FontAwesomeIcon className="icon" icon={faPencilAlt as any} />
						Go Evaluate!
					</Link>
				</h2>
			</div>
			<EvaluationChart
				userMovies={userMovies}
				evaluationList={evaluationList}
				title={movie.title}
			/>
			<OverallComment evaluation={evaluation} />
			<EvaluationCriteriaGrid evaluationList={evaluationList} />
		</section>
	);
};

export default EvaluationDisplay;
