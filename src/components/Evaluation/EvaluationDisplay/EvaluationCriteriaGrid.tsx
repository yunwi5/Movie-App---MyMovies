import React from "react";
import { Evaluation, EvaluationFactor } from "../../../models/Evaluation";
import StarRating from "../../UI/DesignElement/StarRating";

interface Props {
	evaluationList: EvaluationFactor[];
}

const EvaluationCriteriaGrid: React.FC<Props> = ({ evaluationList }) => {
	return (
		<div className="evaluation-criteria">
			<h3>Evaluation based on Criteria</h3>
			<article className="evaluation-grid">
				{evaluationList.map((factor) => (
					<div className="criterion">
						<h4 className="criterion__heading">{factor.name}</h4>
						<StarRating rating={factor.rating} />
						<p className="criterion__text">{factor.text}</p>
					</div>
				))}
			</article>
		</div>
	);
};

export default EvaluationCriteriaGrid;
