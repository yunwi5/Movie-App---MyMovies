interface Props {
	min: number;
	max: number;
	percent: number;
}

const RatingBar: React.FC<Props> = (props) => {
	const { min, max, percent } = props;

	return (
		<div className="rating-bar">
			<label>
				{min}-{max}
			</label>
			<div className="bar-wrapper">
				<span className="bar-outer">
					<span
						style={{ width: percent + "%" }}
						className="bar-inner"
					/>
				</span>
				<span className="percent-number">{percent}%</span>
			</div>
		</div>
	);
};

export default RatingBar;
