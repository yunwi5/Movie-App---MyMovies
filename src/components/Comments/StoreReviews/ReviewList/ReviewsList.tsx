import { useState, useEffect } from "react";
import { Comment } from "../../../../models/Movie";
import ReviewCard from "./ReviewCard";

import AddReview from "../ReviewOperation/AddReview";
import ReviewFilter from "./ReviewFilter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus } from "@fortawesome/pro-solid-svg-icons";
import { filterReviews } from "../../../../utilities/comment-util/comment-filter-util";

interface Props {
	comments: Comment[];
	userEmail: string | null;
	onAdd: (newRating: number, newComment: string) => void;
	onEdit: (commentId: string, newRating: number, newComment: string) => void;
	onDelete: (comment: Comment) => void;
	onVote: (comment: Comment) => void;
}

const ReviewsList: React.FC<Props> = (props) => {
	const { comments, userEmail, onAdd, onEdit, onDelete, onVote } = props;
	const [ isAdding, setIsAdding ] = useState(false);

	const [ filteredComments, setFilteredComments ] = useState(comments);

	const [ ratingFilter, setRatingFilter ] = useState<string>("");
	const [ searchFilter, setSearchFilter ] = useState<string>("");

	function addReviewHandler (newRating: number, newComment: string) {
		onAdd(newRating, newComment);
		setIsAdding(false);
	}

	function ratingFilterHandler (newFilter: string) {
		setRatingFilter(newFilter);
	}

	function searchFilterHandler (newFilter: string) {
		setSearchFilter(newFilter);
	}

	useEffect(
		() => {
			const newFilteredComments = filterReviews(
				comments,
				ratingFilter,
				searchFilter
			);
			setFilteredComments(newFilteredComments);
		},
		[ ratingFilter, searchFilter, comments ]
	);

	return (
		<section className="reviews-container">
			<h3 className="reviews-list-header">
				<span>User Reviews</span>
			</h3>
			<div className="reviews-list-operations">
				<ReviewFilter
					onRatingFilter={ratingFilterHandler}
					onSearchFilter={searchFilterHandler}
				/>
				<div
					className="add-icon-wrapper"
					onClick={() => setIsAdding((prev) => !prev)}
				>
					{userEmail &&
					!isAdding && <FontAwesomeIcon icon={faPlus as IconProp} />}
					{userEmail &&
					isAdding && <FontAwesomeIcon icon={faMinus as IconProp} />}
				</div>
			</div>
			{userEmail &&
			isAdding && (
				<AddReview
					onAdd={addReviewHandler}
					onClose={() => setIsAdding(false)}
				/>
			)}
			<ul className="reviews-list">
				{filteredComments.map((comment) => (
					<ReviewCard
						key={comment.id}
						comment={comment}
						userEmail={userEmail}
						onEdit={onEdit}
						onDelete={onDelete}
						onVote={onVote}
					/>
				))}
			</ul>
		</section>
	);
};

export default ReviewsList;
