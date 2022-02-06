import React, { useReducer } from "react";
import Movie from "../../../models/Movie";
import EvaluationChart from "./EvaluationChart";

import EvaluationForm from "./EvaluationForm";
import {
	Evaluation,
	EvaluationFactor,
	CriteriaList,
	CriterionName
} from "../../../models/Evaluation";

export function createEvaluationList (evaluation: Evaluation, criteriaList: CriterionName[]) {
	const evaluationList: EvaluationFactor[] = [];

	for (const criterion of criteriaList) {
		const evalFactor = evaluation.getEvaluationFactor(criterion);
		evalFactor.rating = Math.floor(Math.random() * 10) + 1;
		evaluationList.push(evalFactor);
	}

	return evaluationList;
}

interface State {
	evaluation: Evaluation;
}

enum ActionType {
	FIX_RATING = "fixRating",
	FIX_TEXT = "fixText",
	FIX_OVERALL_COMMENT = "fixOverallComment"
}

interface Action {
	type: ActionType;
	value: number | string;
}

function evaluationReducer (state: State, action: Action) {
	return state;
}

interface Props {
	movie: Movie;
}

const MovieEvaluation: React.FC<Props> = (props) => {
	const { movie } = props;

	let evaluation = movie.evaluation;
	const title = movie.title;
	if (!evaluation) evaluation = new Evaluation();

	// Use reducer hook
	const [ evaluationState, dispathAction ] = useReducer(evaluationReducer, { evaluation });

	const evaluationList = createEvaluationList(evaluation, CriteriaList);

	return (
		<main className="movie-evaluation">
			<h1 className="evaluation-heading">
				Evaluate <span>{title}</span>
			</h1>
			<div className="evaluation-content">
				<EvaluationChart evaluationList={evaluationList} title={title} />
				<EvaluationForm evaluationList={evaluationList} />
			</div>
		</main>
	);
};

export default MovieEvaluation;
