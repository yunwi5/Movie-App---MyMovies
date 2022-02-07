import React, { useState, Fragment } from "react";
import MovieEditIcon from "../../../UI/IconElement/EditIcon";
import { toDurationString } from "../../../../utilities/movie-util/movies-util";

interface InputProps {
	defaultValue: string;
	isEditing: boolean;
	onStartEdit: () => void;
	onConfirm: (value: string) => void;
	onCancel: () => void;
}

const toMinutesString = (hours: number, minutes: number) => {
	return "" + (hours * 60 + minutes);
};

const DurationEdit: React.FC<InputProps> = (props) => {
	const { defaultValue, isEditing, onStartEdit, onConfirm, onCancel } = props;

	// const [timeString, setTimeString] = useState('');
	const totalMinutes = parseInt(defaultValue);
	const defaultHours = Math.floor(totalMinutes / 60);
	const defaultMinutes = totalMinutes % 60;

	const [ hours, setHours ] = useState(defaultHours);
	const [ minutes, setMinutes ] = useState(defaultMinutes);

	const durationString = toDurationString(totalMinutes); // (int) h (int) m format

	return (
		<div className={`line-input__item--duration`}>
			<label htmlFor="duration" className="item-label">
				<span className="item-label__name">duration</span>
				<MovieEditIcon
					isEditing={isEditing}
					onStartEdit={onStartEdit}
					onCancel={onCancel}
					onConfirm={onConfirm.bind(null, toMinutesString(hours, minutes))}
				/>
			</label>
			{isEditing && (
				<Fragment>
					<input
						className="item-input--number"
						type="number"
						id="duration-hours"
						name="duration"
						max="10"
						defaultValue={defaultHours}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setHours(+e.target.value)}
					/>{" "}
					<strong>h</strong>
					<input
						className="item-input--number"
						type="number"
						id="duration-minutes"
						name="duration"
						max="59"
						defaultValue={defaultMinutes}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setMinutes(+e.target.value)}
					/>{" "}
					<strong>m</strong>
				</Fragment>
			)}
			{!isEditing && <p className="item-p">{durationString}</p>}
		</div>
	);
};

export default DurationEdit;
