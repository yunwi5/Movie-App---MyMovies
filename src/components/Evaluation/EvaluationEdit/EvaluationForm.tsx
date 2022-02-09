import React, { useState, Fragment } from "react";
import { EvaluationFactor, CriteriaList, CriterionName } from "../../../models/Evaluation";
import EvaluationModal from "../../UI/Modal/Evaluation/EvaluationModal";
import InputRatring from "../../UI/InputRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/pro-duotone-svg-icons";

interface Props {
	evaluationList: EvaluationFactor[];
	onChangeCriterion: (criterionName: CriterionName, newRating: number, newText: string) => void;
}

const EvaluationForm: React.FC<Props> = (props) => {
	const { evaluationList, onChangeCriterion } = props;
	const defaultEvaluationFactor = evaluationList[0];
	const [ criterion, setCriterion ] = useState<CriterionName>(defaultEvaluationFactor.name);
	const [ score, setScore ] = useState(defaultEvaluationFactor.rating);
	const [ text, setText ] = useState(defaultEvaluationFactor.text);

	const [ showInfoModal, setShowInfoModal ] = useState(false);

	const criterionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as CriterionName;
		setCriterion(value);
		const existingFactor = evaluationList.find((eva) => eva.name === value);
		if (!existingFactor) {
			throw new Error(`Factor does not exist! Factor: ${value}`);
		}
		const { rating: existingRating, text: existingText } = existingFactor;
		setScore(existingRating);
		setText(existingText);
	};

	const scoreChangeHandler = (newScore: number) => {
		setScore(newScore);
	};

	const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newComment = e.target.value;
		setText(newComment);
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		// console.log(`Criterion: ${criterion} score: ${score}, text: ${text}`);
		onChangeCriterion(criterion, score, text);
	};

	return (
		<Fragment>
			{showInfoModal && <EvaluationModal onClose={() => setShowInfoModal(false)} />}
			<form className="evaluation-form" onSubmit={submitHandler}>
				<FontAwesomeIcon
					icon={faQuestionCircle as any}
					className="info-icon"
					onClick={() => setShowInfoModal(true)}
				/>
				<h3>Evaluation Criteria</h3>
				<div className="select-wrapper">
					<label htmlFor="evaluation-select">Category</label>
					<select
						id="evaluation-select"
						className="evaluation-select"
						value={criterion}
						onChange={criterionChangeHandler}
					>
						{CriteriaList.map((criterion) => (
							<option key={criterion} value={criterion}>
								{criterion}
							</option>
						))}
					</select>
				</div>
				<InputRatring onRatingChange={scoreChangeHandler} rating={score} label="Score" />
				<div className="comment-wrapper">
					<label htmlFor="evaluation-comment">Comment</label>
					<textarea
						name="evaluation-comment"
						id="evaluation-comment"
						cols={30}
						rows={5}
						value={text}
						onChange={commentChangeHandler}
					/>
				</div>
				<div className="btn-wrapper">
					<button className="btn btn-primary-fill">Confirm</button>
				</div>
			</form>
		</Fragment>
	);
};

export default EvaluationForm;
