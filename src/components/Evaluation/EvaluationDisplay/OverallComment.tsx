import React from "react";
import { Evaluation } from "../../../models/Evaluation";
import { getRoundedFormat } from "../../../utilities/calc-util";

// Overall Comment and Average Score
const OverallComment: React.FC<{ evaluation: Evaluation }> = ({ evaluation }) => {
	const { overallComment, averageRating } = evaluation;

	return (
		// Grid display
		<div className="evaluation-summary-grid">
			<h3 className="comment-label">Overall Comment</h3>
			<p className="comment-content">{overallComment}</p>
			<h3 className="rating-label">Average Score</h3>
			<h1 className="rating-content">{getRoundedFormat(averageRating, 2)}</h1>
		</div>
	);
};

export default OverallComment;
