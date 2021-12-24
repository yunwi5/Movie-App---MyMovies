import React, { useRef } from "react";
import Rating from "@mui/material/Rating";

interface Props {
	value: number;
	count: number;
	onCheck: (ratingValue: number) => void;
	clear: boolean;
}

const MovieRating: React.FC<Props> = (props) => {
	const { value, count, onCheck, clear } = props;
	const radioRef = useRef<HTMLInputElement>(null);

	const ratingChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "on") {
			onCheck(value);
		}
	};

	if (clear) {
		radioRef.current!.checked = false;
	}

	return (
		<li>
			<input
				type="radio"
				onChange={ratingChangeHandler}
				id={`ratingChoice${value}`}
				name="rating"
				ref={radioRef}
			/>{" "}
			<label htmlFor={`rating-${value}`}>
				<Rating
					value={value / 2}
					defaultValue={value / 2}
					name={`rating-${value}`}
					size="large"
					disabled
				/>
				<span className="rating-standard">{value} & Up</span>
				<span className="rating-count"> ({count})</span>
			</label>
		</li>
	);
};

export default MovieRating;
