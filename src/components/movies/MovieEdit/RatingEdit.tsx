import React, { useState, Fragment } from "react";
import MovieEditIcon from "./MovieEditIcon";
import Rating from "@mui/material/Rating";

interface InputProps {
	defaultValue: string;
	isEditing: boolean;
	onStartEdit: () => void;
	onConfirm: (value: string) => void;
	onCancel: () => void;
}

const DurationEdit: React.FC<InputProps> = (props) => {
	const { defaultValue, isEditing, onStartEdit, onConfirm, onCancel } = props;

	const [ rating, setRating ] = useState(parseFloat(defaultValue));

	const cancelHandler = () => {
		setRating(parseFloat(defaultValue));
		onCancel();
	};

	return (
		<div className={`line-input__item--rating`}>
			<label htmlFor="rating" className="item-label">
				<span className="item-label__name">
					Rating <span className="item-label__name--small">(max 10)</span>
				</span>
				<MovieEditIcon
					isEditing={isEditing}
					onStartEdit={onStartEdit}
					onCancel={cancelHandler}
					onConfirm={onConfirm.bind(null, "" + rating)}
				/>
			</label>
			{isEditing && (
				<div className="rating">
					<Rating
						className="rating__star"
						name="rating-large"
						value={rating / 2}
						precision={0.5}
						size="large"
						onChange={(e, newValue) => setRating(newValue ? newValue * 2 : 0)}
					/>
					<input
						className="item-input--number"
						type="number"
						id="duration-hours"
						name="duration"
						max="10"
						step={0.1}
						value={rating}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setRating(+e.target.value)}
					/>{" "}
				</div>
			)}
			{!isEditing && (
				<div className="rating">
					<Rating
						className="rating__star"
						name="rating-large"
						precision={0.5}
						value={rating / 2}
						readOnly
					/>
					<span className="rating__text">({rating}/10)</span>
				</div>
			)}
		</div>
	);
};

export default DurationEdit;
