import React, { useState, useEffect, useContext } from "react";
import Movie, { Comment } from "../../../models/Movie";
import ReviewSummary from "./ReviewSummary/ReviewSummary";
import ReviewsList from "./ReviewList/ReviewsList";
import AuthContext from "../../../store/auth-context";
import { getFormattedDateString } from "../../../utilities/string-util";
import {
	DUMMY_COMMENTS,
	userAlreadyReviewed,
	getInitialComments
} from "../../../utilities/comment-util/user-comment-util";
import {
	addCommentToMovie,
	editMovieComment,
	deleteMovieComment
} from "../../../api/store-comment-api";

const StoreComment: React.FC<{ movie: Movie }> = ({ movie }) => {
	const authCtx = useContext(AuthContext);
	const user = authCtx.user;

	const [ comments, setComments ] = useState(DUMMY_COMMENTS);

	const alreadyHaveOne = userAlreadyReviewed(
		comments,
		user ? user.email : ""
	);
	const [ userHasReview, setUserHasReview ] = useState(alreadyHaveOne);

	useEffect(() => {
		// Try getting initial comments;
		async function getComments () {
			const storedComments = await getInitialComments(movie.id);
			setComments([ ...storedComments, ...DUMMY_COMMENTS ]);
		}
		getComments();
	}, []);

	async function addReviewHandler (newRating: number, newComment: string) {
		if (!user) return;
		// if (userHasReview) {
		// 	alert("You alreay have a review!");
		// 	return;
		// }

		const dateString = getFormattedDateString();

		const newCommentObj: Comment = {
			id: new Date().toISOString(),
			movieId: movie.id,
			userName: user.userName,
			userEmail: user.email,
			commentText: newComment,
			dateString,
			rating: newRating,
			upVotesList: [],
			downVotesList: []
		};
		// Send HTTP POST Request
		const returnedKey = await addCommentToMovie(movie.id, newCommentObj);
		newCommentObj.key = returnedKey;

		setComments((prevComments) => [ newCommentObj, ...prevComments ]);
		setUserHasReview(true);
	}

	function editReviewHandler (
		commentId: string,
		newRating: number,
		newComment: string
	) {
		const newDateString = getFormattedDateString();
		const commentFound = comments.find((c) => c.id === commentId);

		if (!commentFound || !user) return;

		const updatedCommentObj: Comment = {
			...commentFound,
			dateString: newDateString,
			commentText: newComment,
			rating: newRating
		};

		const otherComments = comments.filter((c) => c.id !== commentId);
		setComments([ updatedCommentObj, ...otherComments ]);

		// Send HTTP PUT Request
		editMovieComment(movie.id, updatedCommentObj);
	}

	function deleteReviewHandler (comment: Comment) {
		if (!user) return;

		const filteredComments = comments.filter((c) => c.id !== comment.id);
		setComments(filteredComments);
		setUserHasReview(false);

		if (!comment.key) {
			console.log("This comment does not even have key!");
			return;
		}
		// Send HTTP DELETE Request
		deleteMovieComment(movie.id, comment.key);
	}

	function voteChangeHandler (updatedComment: Comment) {
		// Send HTTP PUT Request
		editMovieComment(movie.id, updatedComment);
	}

	return (
		<article className="store-reviews">
			<h2>Store Reviews</h2>
			<ReviewSummary comments={comments} />
			<ReviewsList
				comments={comments}
				userEmail={user ? user.email : null}
				onAdd={addReviewHandler}
				onEdit={editReviewHandler}
				onDelete={deleteReviewHandler}
				onVote={voteChangeHandler}
			/>
		</article>
	);
};

export default StoreComment;
