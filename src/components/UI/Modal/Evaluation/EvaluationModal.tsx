import React from "react";
import Modal from "../Modal";
import { CriteriaList, CriterionName } from "../../../../models/Evaluation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faListMusic,
	faTransporter2,
	faVideoPlus,
	faCommentAltLines,
	faBallot,
	faProjector,
	faBookSpells,
	faWreath
} from "@fortawesome/pro-duotone-svg-icons";

function getCriterionDefinition (criterion: CriterionName) {
	switch (criterion) {
		case CriterionName.SOUND_TRACK:
			return "Sound and music are suited to the film and they help tell the story of their own";
		case CriterionName.CHARACTERS:
			return "Personalities that are distinctive, compelling, multi-layered, and unpredictable. A protagonist and antagonist with clear and active goals.";
		case CriterionName.CREATIVITY:
			return "The effective use of imagination as evidenced in the entry.";
		case CriterionName.ORIGINALITY:
			return "The uniqueness and originality of the premise or story.";
		case CriterionName.MESSAGE_EFFECTIVENESS:
			return "The film clearly depics the message of the chartiy or cause it represents.";
		case CriterionName.ACTORS_AND_CINEMATOGRAPHY:
			return "The actors convince the audience they are the characters they're portraying.";
		case CriterionName.STORY:
			return "A plot that tells both an intriguing and unusual story";
		case CriterionName.PLOT:
			return "The actions, events, conflicts, and turning points that propel the story forward. How the story unfolds.";
	}
}

function getCriterionIcon (criterion: CriterionName) {
	switch (criterion) {
		case CriterionName.SOUND_TRACK:
			return <FontAwesomeIcon className="icon" icon={faListMusic as any} />;
		case CriterionName.CHARACTERS:
			return <FontAwesomeIcon className="icon" icon={faTransporter2 as any} />;
		case CriterionName.CREATIVITY:
			return <FontAwesomeIcon className="icon" icon={faVideoPlus as any} />;
		case CriterionName.MESSAGE_EFFECTIVENESS:
			return <FontAwesomeIcon className="icon" icon={faCommentAltLines as any} />;
		case CriterionName.PLOT:
			return <FontAwesomeIcon className="icon" icon={faBallot as any} />;
		case CriterionName.ORIGINALITY:
			return <FontAwesomeIcon className="icon" icon={faWreath as any} />;
		case CriterionName.STORY:
			return <FontAwesomeIcon className="icon" icon={faBookSpells as any} />;
		case CriterionName.ACTORS_AND_CINEMATOGRAPHY:
			return <FontAwesomeIcon className="icon" icon={faProjector as any} />;
	}
}

interface Props {
	onClose: () => void;
}

const EvaluationModal: React.FC<Props> = ({ onClose }) => {
	return (
		<Modal onClose={onClose} modalClass="evaluation-modal">
			<h2>About Evaluation Criteria</h2>
			<p>{CriteriaList.length} Representative Criteria</p>
			<ul className="criteria-list">
				{CriteriaList.map((criterion) => (
					<li className="criterion">
						{getCriterionIcon(criterion)}
						<span className="criterion__name">{criterion}:</span>
						<span className="criterion__guide">
							{getCriterionDefinition(criterion)}
						</span>
					</li>
				))}
			</ul>
			<button className="btn-secondary-fill" onClick={onClose}>
				Close
			</button>
		</Modal>
	);
};

export default EvaluationModal;
