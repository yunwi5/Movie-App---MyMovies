export enum CriterionName {
	SOUND_TRACK = "Soundtrack",
	STORY = "Story",
	ORIGINALITY = "Originality",
	ACTORS_AND_CINEMATOGRAPHY = "Actors/Cinematography",
	MESSAGE_EFFECTIVENESS = "Message Effectiveness",
	CHARACTERS = "Characters",
	PLOT = "Plot",
	CREATIVITY = "Creativity"
}

export const CriteriaList = [
	CriterionName.SOUND_TRACK,
	CriterionName.STORY,
	CriterionName.ORIGINALITY,
	CriterionName.ACTORS_AND_CINEMATOGRAPHY,
	CriterionName.MESSAGE_EFFECTIVENESS,
	CriterionName.CHARACTERS,
	CriterionName.PLOT,
	CriterionName.CREATIVITY
];

export interface EvaluationFactor {
	name: CriterionName;
	rating: number;
	text: string;
}

export class Evaluation {
	overallComment: string;
	averageRating: number;
	soundTrack: EvaluationFactor = { name: CriterionName.SOUND_TRACK, rating: 0, text: "" };
	story: EvaluationFactor = { name: CriterionName.STORY, rating: 0, text: "" };
	originality: EvaluationFactor = { name: CriterionName.ORIGINALITY, rating: 0, text: "" };
	actorsAndCinematography: EvaluationFactor = {
		name: CriterionName.ACTORS_AND_CINEMATOGRAPHY,
		rating: 0,
		text: ""
	};
	messageEffectiveness: EvaluationFactor = {
		name: CriterionName.MESSAGE_EFFECTIVENESS,
		rating: 0,
		text: ""
	};
	characters: EvaluationFactor = { name: CriterionName.CHARACTERS, rating: 0, text: "" };
	plot: EvaluationFactor = { name: CriterionName.PLOT, rating: 0, text: "" };
	creativity: EvaluationFactor = { name: CriterionName.CREATIVITY, rating: 0, text: "" };

	constructor () {
		this.overallComment = "";
		this.averageRating = 0;
	}

	public setOverallComment (newComment: string): void {
		if (newComment.trim().length === 0) return;
		this.overallComment = newComment;
	}

	public getEvaluationFactor (factorName: CriterionName): EvaluationFactor {
		switch (factorName) {
			case CriterionName.SOUND_TRACK:
				return this.soundTrack;
			case CriterionName.STORY:
				return this.story;
			case CriterionName.ORIGINALITY:
				return this.originality;
			case CriterionName.ACTORS_AND_CINEMATOGRAPHY:
				return this.actorsAndCinematography;
			case CriterionName.MESSAGE_EFFECTIVENESS:
				return this.messageEffectiveness;
			case CriterionName.CHARACTERS:
				return this.characters;
			case CriterionName.PLOT:
				return this.plot;
			case CriterionName.CREATIVITY:
				return this.creativity;
		}
	}

	public setRating (factorName: CriterionName, newRating: number): void {
		switch (factorName) {
			case CriterionName.SOUND_TRACK:
				this.soundTrack.rating = newRating;
				break;
			case CriterionName.STORY:
				this.story.rating = newRating;
				break;
			case CriterionName.ORIGINALITY:
				this.originality.rating = newRating;
				break;
			case CriterionName.ACTORS_AND_CINEMATOGRAPHY:
				this.actorsAndCinematography.rating = newRating;
				break;
			case CriterionName.MESSAGE_EFFECTIVENESS:
				this.messageEffectiveness.rating = newRating;
				break;
			case CriterionName.CHARACTERS:
				this.characters.rating = newRating;
				break;
			case CriterionName.PLOT:
				this.plot.rating = newRating;
				break;
			case CriterionName.CREATIVITY:
				this.creativity.rating = newRating;
				break;
		}

		const newAve =
			(this.soundTrack.rating +
				this.story.rating +
				this.originality.rating +
				this.actorsAndCinematography.rating +
				this.messageEffectiveness.rating +
				this.characters.rating +
				this.plot.rating +
				this.creativity.rating) /
			8;
		const newAve2 = (this.averageRating * 7 + newRating) / 8;
		console.log(`New Ave1: ${newAve}, New Ave2: ${newAve2}`);

		this.averageRating = newAve;
	}

	public setText (factorName: CriterionName, newText: string): void {
		switch (factorName) {
			case CriterionName.SOUND_TRACK:
				this.soundTrack.text = newText;
				break;
			case CriterionName.STORY:
				this.story.text = newText;
				break;
			case CriterionName.ORIGINALITY:
				this.originality.text = newText;
				break;
			case CriterionName.ACTORS_AND_CINEMATOGRAPHY:
				this.actorsAndCinematography.text = newText;
				break;
			case CriterionName.MESSAGE_EFFECTIVENESS:
				this.messageEffectiveness.text = newText;
				break;
			case CriterionName.CHARACTERS:
				this.characters.text = newText;
				break;
			case CriterionName.PLOT:
				this.plot.text = newText;
				break;
			case CriterionName.CREATIVITY:
				this.creativity.text = newText;
				break;
		}
	}
}

export interface EvaluationObject {
	overallComment: string;
	averageRating: number;
	soundTrack: EvaluationFactor;
	story: EvaluationFactor;
	originality: EvaluationFactor;
	actorsAndCinematography: EvaluationFactor;
	messageEffectiveness: EvaluationFactor;
	characters: EvaluationFactor;
	plot: EvaluationFactor;
	creativity: EvaluationFactor;
}
