import Rating from "@mui/material/Rating";

interface Props {
	onRatingChange: (newvalue: number) => void;
	rating: number;
	label?: string;
}

const InputRating: React.FC<Props> = ({ label, onRatingChange, rating }) => {
	return (
		<div className="rating-wrapper">
			<h4>
				{label ? label : "Rating"} <span>(max 10)</span>
			</h4>
			<Rating
				className="stars"
				name="size-large"
				value={rating / 2}
				precision={0.5}
				size="large"
				onChange={(e, newValue) => onRatingChange(newValue ? newValue * 2 : 0)}
			/>
			<input
				id="rating"
				value={rating}
				placeholder="(1dp)"
				type="number"
				min="0"
				max="10"
				step="0.1"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onRatingChange(+e.target.value)}
				required
			/>
		</div>
	);
};

export default InputRating;
