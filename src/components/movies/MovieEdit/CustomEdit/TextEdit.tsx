import { useState } from "react";
import MovieEditIcon from "../../../UI/IconElement/EditIcon";
import { InputType } from "../MovieEdit";

interface InputProps {
	name: string;
	type: string;
	defaultValue: string;
	isEditing: boolean;
	onStartEdit: () => void;
	onConfirm: (value: string) => void;
	onCancel: () => void;
}

const MovieTextEdit: React.FC<InputProps> = (props) => {
	const { name, type, defaultValue, isEditing, onStartEdit, onConfirm, onCancel } = props;

	const [ value, setValue ] = useState(defaultValue);
	const isTextArea = type === InputType.TEXT_AREA;

	const cancelHandler = () => {
		setValue(defaultValue);
		onCancel();
	};

	return (
		<div className={`line-input__item--${name}`}>
			<label htmlFor={name} className="item-label">
				<span className="item-label__name">{name}</span>
				<MovieEditIcon
					isEditing={isEditing}
					onStartEdit={onStartEdit}
					onCancel={cancelHandler}
					onConfirm={onConfirm.bind(null, value)}
				/>
			</label>
			{isEditing &&
			!isTextArea && (
				<input
					className="item-input"
					type={type}
					id={name}
					name={name}
					defaultValue={defaultValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
				/>
			)}
			{isEditing &&
			isTextArea && (
				<textarea
					className="item-textarea"
					id={name}
					name={name}
					defaultValue={defaultValue}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						setValue(e.target.value)}
				/>
			)}
			{!isEditing && <p className="item-p">{value}</p>}
		</div>
	);
};

export default MovieTextEdit;
