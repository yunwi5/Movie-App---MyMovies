import { useState } from "react";

import InputRating from "../../../UI/InputRating";
import {
	validateRating,
	validateComment
} from "../../../../utilities/input-util/validation-util";

interface FormProps {
	defaultRating: number | null;
	defaultText: string | null;
	onSubmit: (newRating: number, newComment: string) => void;
	onClose?: () => void;
}

const ReviewForm: React.FC<FormProps> = (props) => {
	const { onSubmit, onClose, defaultRating, defaultText } = props;
	const [ rating, setRating ] = useState<number>(defaultRating || 0);
	const [ ratingErrorMessage, setRatingErrorMessage ] = useState<
		string | null
	>(null);
	const [ comment, setComment ] = useState(defaultText || "");
	const [ commentErrorMessage, setCommentErrorMessage ] = useState<
		string | null
	>(null);

	function submitHandler (e: React.FormEvent) {
		e.preventDefault();
		const { ratingUserMessage, ratingIsValid } = validateRating(rating);
		const { commentUserMessage, commentIsValid } = validateComment(comment);

		if (!ratingIsValid || !commentIsValid) {
			if (!ratingIsValid) setRatingErrorMessage(ratingUserMessage);
			if (!commentIsValid) setCommentErrorMessage(commentUserMessage);
			return;
		}
		// Pass the validation test!
		onSubmit(rating, comment);
	}

	function ratingChangeHandler (newValue: number) {
		const { ratingIsValid } = validateRating(rating);
		setRating(newValue);
		if (ratingErrorMessage && ratingIsValid) {
			setRatingErrorMessage(null);
		}
	}

	function commentChangeHandler (e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newComment = e.target.value;
		const { commentIsValid } = validateComment(comment);
		setComment(newComment);
		if (commentErrorMessage && commentIsValid) {
			setCommentErrorMessage(null);
		}
	}

	return (
		<form onSubmit={submitHandler} className="review-form">
			<InputRating rating={rating} onRatingChange={ratingChangeHandler} />
			{ratingErrorMessage && (
				<p className="error-message">{ratingErrorMessage}</p>
			)}
			<div className="comment-area">
				<label htmlFor="review-comment">Comment</label>
				<textarea
					id="review-comment"
					value={comment}
					onChange={commentChangeHandler}
				/>
				{commentErrorMessage && (
					<p className="error-message">{commentErrorMessage}</p>
				)}
			</div>
			<div className="btn-wrapper">
				<button className="btn-secondary-fill">Confirm</button>
				<button
					type="button"
					onClick={onClose}
					className="btn-secondary-empty"
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default ReviewForm;
