import React, { useRef } from "react";

interface Props {
	name: string;
	count: number;
	onCheck: (genre: string) => void;
	clear: boolean;
}

const MovieGenre: React.FC<Props> = (props) => {
	const checkboxRef = useRef<HTMLInputElement>(null);

	const { name, count, onCheck, clear } = props;
	const genreChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target, event.target.value);
		console.log("checkbox checked: ", checkboxRef.current!.checked);
		onCheck(name);
	};

	if (clear) {
		checkboxRef.current!.checked = false;
	}

	return (
		<li>
			<input type="checkbox" name="genre" id={name} onChange={genreChangeHandler} ref={checkboxRef} />
			<label htmlFor={name}>
				<span>{name}</span>
				<span> ({count})</span>{" "}
			</label>
		</li>
	);
};

export default MovieGenre;
