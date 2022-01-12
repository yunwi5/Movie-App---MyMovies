import { useState, useEffect, Fragment } from "react";
import { Comment } from "../../../../models/Movie";
import EditReview from "../ReviewOperation/EditReview";

import UserInitial from "../../../UI/UserInitial";
import DeleteModal from "../../../UI/Modal/DeleteModal";
import {
	verityIfUserUpVoted,
	verityIfUserDownVoted
} from "../../../../utilities/comment-util/user-comment-util";

import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/pro-duotone-svg-icons";

interface Props {
	comment: Comment;
	userEmail: string | null;
	onEdit: (commentId: string, newRating: number, newComment: string) => void;
	onDelete: (commentId: Comment) => void;
	onVote: (comment: Comment) => void;
}

const ReviewCard: React.FC<Props> = (props) => {
	const { comment, userEmail, onEdit, onDelete, onVote } = props;
	const {
		userName,
		upVotesList,
		downVotesList,
		rating,
		dateString,
		commentText
	} = comment;

	const [ upVotes, setUpVotes ] = useState<string[]>(upVotesList || []);
	const [ isUpVoted, setIsUpVoted ] = useState(false);
	const [ downVotes, setDownVotes ] = useState<string[]>(downVotesList || []);
	const [ isDownVoted, setIsDownVoted ] = useState(false);

	const [ showEdit, setShowEdit ] = useState(false);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);

	// Show Revie Edit only if the user is the same as the review writer.
	const isTheSameUser = userEmail === comment.userEmail;

	function upVotingHandler () {
		if (isDownVoted || !userEmail) return;
		if (isUpVoted) {
			const newUpVotesList = upVotes.filter((u) => u !== userEmail);
			setUpVotes(newUpVotesList);
			setIsUpVoted(false);
			return;
		}
		setUpVotes((prev) => [ ...prev, userEmail ]);
		setIsUpVoted(true);
	}

	function downVotingHandler () {
		if (isUpVoted || !userEmail) return;
		if (isDownVoted) {
			const newDownVotes = downVotes.filter((u) => u !== userEmail);
			setDownVotes(newDownVotes);
			setIsDownVoted(false);
			return;
		}
		setDownVotes((prev) => [ ...prev, userEmail ]);
		setIsDownVoted(true);
	}

	useEffect(
		() => {
			if (!comment.key) return;
			if (!isUpVoted && !isDownVoted) return;
			const newComment = {
				...comment,
				upVotesList: upVotes,
				downVotesList: downVotes
			};
			onVote(newComment);
		},
		[ upVotes, downVotes ]
	);

	useEffect(
		() => {
			if (!userEmail || !comment.key) return;
			const userUpVote = verityIfUserUpVoted(
				upVotesList || [],
				userEmail
			);
			const userDownVote = verityIfUserDownVoted(
				downVotesList || [],
				userEmail
			);
			setIsUpVoted(userUpVote);
			setIsDownVoted(userDownVote);
		},
		[ userEmail ]
	);

	function deleteReviewHandler () {
		setShowDeleteModal(true);
	}

	const modalContent = {
		message: "Do you want to delete your review?",
		onClose: () => setShowDeleteModal(false),
		onDelete: onDelete.bind(null, comment)
	};

	return (
		<Fragment>
			{showDeleteModal && <DeleteModal modalContent={modalContent} />}
			<li className="review-card">
				{isTheSameUser &&
				showEdit && (
					<EditReview
						onEdit={onEdit}
						onClose={() => setShowEdit(false)}
						comment={comment}
					/>
				)}

				<div className="review-initial">
					<UserInitial userName={comment.userName} />
				</div>

				<div className="review-body">
					<h5>{userName}</h5>
					<div className="rating-and-date">
						<Rating
							className="stars"
							value={rating / 2}
							precision={0.5}
							readOnly
						/>
						<span className="rating-number">({rating})</span>
						<time>
							<em>{dateString}</em>
						</time>
					</div>

					<p className="comment-text">{commentText}</p>

					{/* <p>Was this review helpful?</p> */}
					<div className="votes">
						<div className="vote-wrapper">
							<div
								className={`icon-wrapper ${isUpVoted
									? "icon-active"
									: ""}`}
								onClick={upVotingHandler}
							>
								<FontAwesomeIcon
									className={`icon icon-upvote`}
									icon={faThumbsUp as IconProp}
								/>
							</div>
							<span>{upVotes.length}</span>
						</div>
						<div className={`vote-wrapper`}>
							<div
								className={`icon-wrapper ${isDownVoted
									? "icon-active"
									: ""}`}
								onClick={downVotingHandler}
							>
								<FontAwesomeIcon
									className={`icon icon-downvote`}
									icon={faThumbsDown as IconProp}
								/>
							</div>
							<span>{downVotes.length}</span>
						</div>
						{isTheSameUser && (
							<div className="operations">
								<div
									className="edit"
									onClick={() => setShowEdit(true)}
								>
									<FontAwesomeIcon
										className="icon"
										icon={faPenToSquare as IconProp}
									/>
								</div>
								&ensp;
								<div
									className="delete"
									onClick={deleteReviewHandler}
								>
									<FontAwesomeIcon
										className="icon"
										icon={faTrashCan as IconProp}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</li>
		</Fragment>
	);
};

export default ReviewCard;
