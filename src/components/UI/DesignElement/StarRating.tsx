import React from "react";
import Rating from "@mui/material/Rating";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<div className="rating">
			<Rating
				className="stars"
				name="size-medium"
				value={rating / 2}
				size="large"
				precision={0.5}
				readOnly
			/>
			<span className="rating__number">({rating}/10)</span>
		</div>
	);
};

export default StarRating;
