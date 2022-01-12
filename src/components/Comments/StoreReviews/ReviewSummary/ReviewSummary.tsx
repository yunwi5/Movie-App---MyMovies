import { useState, useEffect } from "react";
import RatingBar from "./RatingBar";
import { Comment } from "../../../../models/Movie";
import Rating from "@mui/material/Rating";

interface Props {
	comments: Comment[];
}

function getAveraggeRating (comments: Comment[]) {
	const total = comments.reduce(
		(prev, curComment) => prev + curComment.rating,
		0
	);
	return total / comments.length;
}

function getPercentage (ratingCount: number, totalCount: number) {
	return Math.round(ratingCount / totalCount * 100);
}

function getRatingsPercentagesForEachRange (
	comments: Comment[],
	reviewsCount: number
) {
	let zeroToTwo = 0,
		twoToFour = 0,
		fourToSix = 0,
		sixToEight = 0,
		eightToTen = 0;

	for (const c of comments) {
		let rating = c.rating;

		if (rating < 2) {
			zeroToTwo++;
		} else if (rating < 4) {
			twoToFour++;
		} else if (rating < 6) {
			fourToSix++;
		} else if (rating < 8) {
			sixToEight++;
		} else {
			eightToTen++;
		}
	}

	const eightToTenPercentage = getPercentage(eightToTen, reviewsCount);
	const sixToEightPercentage = getPercentage(sixToEight, reviewsCount);
	const fourToSixPercentage = getPercentage(fourToSix, reviewsCount);
	const twoToFourPercentage = getPercentage(twoToFour, reviewsCount);
	const zeroToTwoPercentage = getPercentage(zeroToTwo, reviewsCount);

	return {
		eightToTen: eightToTenPercentage,
		sixToEight: sixToEightPercentage,
		fourToSix: fourToSixPercentage,
		twoToFour: twoToFourPercentage,
		zeroToTwo: zeroToTwoPercentage
	};
}

const ReviewSummary: React.FC<Props> = ({ comments }) => {
	const averageRating = Math.round(getAveraggeRating(comments) * 10) / 10;
	const reviewsCount = comments.length;

	const {
		eightToTen,
		sixToEight,
		fourToSix,
		twoToFour,
		zeroToTwo
	} = getRatingsPercentagesForEachRange(comments, reviewsCount);

	return (
		<section className="review-summary">
			<div className="review-heading">
				<div className="review-heading__rating-number">
					{averageRating}
				</div>
				<Rating
					className="review-heading__rating-stars"
					precision={0.5}
					value={averageRating / 2}
					readOnly
				/>
				<p className="review-heading__rating-count">
					{reviewsCount} reviews
				</p>
			</div>
			<div className="distribution">
				<RatingBar min={8} max={10} percent={eightToTen} />
				<RatingBar min={6} max={8} percent={sixToEight} />
				<RatingBar min={4} max={6} percent={fourToSix} />
				<RatingBar min={2} max={4} percent={twoToFour} />
				<RatingBar min={0} max={2} percent={zeroToTwo} />
			</div>
		</section>
	);
};

export default ReviewSummary;
