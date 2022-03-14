import Movie from "../../models/Movie";
import {
	Evaluation,
	EvaluationObject,
	EvaluationFactor,
	CriteriaList,
	CriterionName
} from "../../models/Evaluation";

// Helper funciton for convertToUserMoviesWithEval fn, to convert rough evaluation object
// To formal evaluation class object.
function convertToEvaluationObj (evaluationObj: EvaluationObject): Evaluation {
	const evaluation = new Evaluation();
	evaluation.averageRating = evaluationObj.averageRating;
	evaluation.overallComment = evaluationObj.overallComment;
	// 8 Criteria
	evaluation.actorsAndCinematography = evaluationObj.actorsAndCinematography;
	evaluation.characters = evaluationObj.characters;
	evaluation.creativity = evaluationObj.creativity;
	evaluation.messageEffectiveness = evaluationObj.messageEffectiveness;
	evaluation.originality = evaluationObj.originality;
	evaluation.plot = evaluationObj.plot;
	evaluation.soundTrack = evaluationObj.soundTrack;
	evaluation.story = evaluationObj.story;

	return evaluation;
}

// Used in user-auth-api to convert the Evaluation rough object to Evaluation class object
// For each movie in the user movies.
export function convertToUserMoviesWithEval (movies: Movie[]) {
	for (const movie of movies) {
		if (!movie.evaluation) continue;
		const evaluation = convertToEvaluationObj(movie.evaluation);
		movie.evaluation = evaluation;
	}

	return movies;
}

// Used in MovieEvaluation component to create initial array of EvaluationFactors.
export function createEvaluationList (evaluation: Evaluation, criteriaList: CriterionName[]) {
	const evaluationList: EvaluationFactor[] = [];

	for (const criterion of criteriaList) {
		const evalFactor = evaluation.getEvaluationFactor(criterion);
		evaluationList.push(evalFactor);
	}

	return evaluationList;
}

// Used in EvaluationChart component, to create two datasets, one for current movie evaluation,
// And the other for average movie evaluation. The user can compare the scores to the average directly.
export function getAverageEvaluationList (userMovies: Movie[]): number[] {
	const moviesWithEval = userMovies.filter((m) => m.evaluation);

	const N = moviesWithEval.length;
	const averageList = [];
	for (const criterion of CriteriaList) {
		const criterionTotal = moviesWithEval.reduce((prev, currMovie) => {
			if (!currMovie.evaluation) {
				console.error(`${currMovie.title} has no evaluation but was not filtered!`);
				return prev;
			}
			return prev + currMovie.evaluation.getEvaluationFactor(criterion).rating;
		}, 0);

		const criterionAverage = criterionTotal / N;
		averageList.push(criterionAverage);
	}

	return averageList;
}

export function isEvaluationEmpty (evaluation: Evaluation) {
	return !evaluation.overallComment && evaluation.averageRating === 0;
}
