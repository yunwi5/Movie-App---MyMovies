import ReviewForm from "./ReviewForm";
import Modal from "../../../UI/Modal/Modal";
import { Comment } from "../../../../models/Movie";

interface Props {
	onEdit: (commentId: string, newRating: number, newComment: string) => void;
	onClose: () => void;
	comment: Comment;
}

const EditReview: React.FC<Props> = (props) => {
	const { onEdit, onClose, comment } = props;

	function editHandler (newRating: number, newComment: string) {
		onEdit(comment.id, newRating, newComment);
		onClose();
	}

	return (
		<Modal onClose={onClose} modalClass="edit-modal">
			<h3>Edit Review</h3>
			<ReviewForm
				defaultRating={comment.rating}
				defaultText={comment.commentText}
				onSubmit={editHandler}
				onClose={onClose}
			/>
		</Modal>
	);
};

export default EditReview;
