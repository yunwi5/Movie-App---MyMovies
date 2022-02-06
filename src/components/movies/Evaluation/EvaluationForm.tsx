import React, { useState } from "react";
import {
	Evaluation,
	EvaluationFactor,
	CriteriaList,
	CriterionName
} from "../../../models/Evaluation";
import InputRatring from "../../UI/InputRating";

interface Props {
	evaluationList: EvaluationFactor[];
}

const EvaluationForm: React.FC<Props> = (props) => {
	const { evaluationList } = props;
	const [ criterion, setCriterion ] = useState<CriterionName>(CriteriaList[0]);
	const [ score, setScore ] = useState(0);
	const [ commentText, setCommetText ] = useState("");

	const scoreChangeHandler = (newScore: number) => {
		setScore(newScore);
	};

	const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newComment = e.target.value;
		setCommetText(newComment);
	};

	const criterionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setCriterion(value as CriterionName);
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(`Criterion: ${criterion} score: ${score}, text: ${commentText}`);
	};

	return (
		<section className="evaluation-form-wrapper">
			<form className="evaluation-form" onSubmit={submitHandler}>
				<h3>Add/Edit Evaluation</h3>
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
						rows={10}
						value={commentText}
						onChange={commentChangeHandler}
					/>
				</div>
				<div className="btn-wrapper">
					<button className="btn btn-primary-fill">Confirm</button>
				</div>
			</form>
		</section>
	);
};

export default EvaluationForm;
