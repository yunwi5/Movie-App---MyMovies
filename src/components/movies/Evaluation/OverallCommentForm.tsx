import React, { useState } from "react";

interface Props {
	onChangeComment: (newComment: string) => void;
	initialComment: string;
}

const OverallCommentForm: React.FC<Props> = (props) => {
	const { onChangeComment, initialComment } = props;
	const [ comment, setComment ] = useState(initialComment);
	const [ userMessage, setUserMessage ] = useState<string | null>(null);

	let timer: ReturnType<typeof setTimeout>;

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		// Clear the timer that was not cleared in the last submit
		if (!timer) clearTimeout(timer);
		if (initialComment.trim() === comment) {
			// If there is no change, no call needed
			setUserMessage("Nothing changed!");
		} else {
			onChangeComment(comment);
			setUserMessage("Changed will be saved!");
		}

		timer = setTimeout(() => {
			setUserMessage(null);
		}, 1000);
	};

	return (
		<form onSubmit={submitHandler} className="overall-comment-form">
			<h3>Overall Comment</h3>
			<div className="btn-wrapper">
				{!userMessage && <button className="btn-primary-fill">Save</button>}
				{userMessage && <p className="user-message">{userMessage}</p>}
			</div>
			<textarea
				name="comment-text"
				id="comment-text"
				cols={30}
				rows={5}
				value={comment}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
			/>
		</form>
	);
};

export default OverallCommentForm;
