import React, { useState, useReducer } from "react";

import Movie, { genre as MovieGenre } from "../../../models/Movie";
import { toShortcutString } from "../../../utilities/string-util";
import { GenreList } from "../../../models/Movie";
import InputRating from "../../UI/InputRating";

interface Props {
	onSubmit: (movieObj: Movie) => void;
}

const defaultGenreList: MovieGenre[] = [ "Other" ];

type State = { hours: number; minutes: number };

type Action = { type: "HOURS"; newHours: number } | { type: "MINUTES"; newMinutes: number };

const durationReducer = (state: State, action: Action) => {
	console.log(state);
	if (action.type === "HOURS") {
		return { hours: action.newHours, minutes: state.minutes };
	} else if (action.type === "MINUTES") {
		return { hours: state.hours, minutes: action.newMinutes };
	}
	return state;
};

const Movieform: React.FC<Props> = ({ onSubmit }) => {
	const [ title, setTitle ] = useState("");
	const [ titleIsValid, setTitleIsValid ] = useState(true);

	const [ imgUrl, setImgUrl ] = useState("");
	const [ imgUrlIsvalid, setImgUrlIsValid ] = useState(true);

	const [ rating, setRating ] = useState(0);
	const [ genreList, setGenreList ] = useState<Array<MovieGenre>>([]);

	const [ description, setDescription ] = useState("");
	const [ descriptionIsValid, setDescriptionIsValid ] = useState(true);

	// Optional Properties
	const [ producer, setProducer ] = useState<string | null>(null);
	const [ director, setDirector ] = useState<string | null>(null);

	const [ year, setYear ] = useState<number | null>(null);
	const [ yearIsValid, setYearIsValid ] = useState(true);

	const [ durationState, dispatchDuration ] = useReducer(durationReducer, {
		hours: 0,
		minutes: 0
	});

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const submitGenres = genreList.length !== 0 ? genreList : defaultGenreList;
		submitGenres.sort((s1, s2) => (s1 <= s2 ? -1 : 1));

		const durationTotalMinutes = durationState.hours * 60 + durationState.minutes;

		const movieObj: Movie = {
			id: new Date().toISOString(),
			title,
			rating,
			genreList: submitGenres,
			imgUrl,
			producer,
			duration: durationTotalMinutes,
			year,
			description,
			isFavorite: false,
			director,
			isFromStore: false,
			comments: []
		};
		console.log(movieObj);

		onSubmit(movieObj);
	};

	const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value.trim() as string);
	};

	const imgUrlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImgUrl(e.target.value.trim() as string);
	};

	const descChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value.trim() as string);
	};

	const yearChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const year = e.target.value ? +e.target.value : null;
		setYear(year);
	};

	const genreChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (genreList.length >= 4) return;

		const newGenre = e.target.value as MovieGenre;
		const index = genreList.indexOf(newGenre);
		// if index is not -1, then it already exists.
		if (index >= 0) return;
		const newGenreList = [ ...genreList ].filter((genre) => genre !== newGenre);
		newGenreList.push(newGenre);
		setGenreList(newGenreList);
	};

	const genreDeleteHandler = (clickedGenre: MovieGenre) => {
		const newGenres = genreList.filter((genre) => genre !== clickedGenre);
		setGenreList(newGenres);
	};

	const genreListElements = genreList.map((genre: MovieGenre, idx: number) => (
		<li key={idx} onClick={(e: React.MouseEvent<HTMLLIElement>) => genreDeleteHandler(genre)}>
			<i className="fa fa-angle-right" />
			{toShortcutString(genre)}
		</li>
	));

	return (
		<form className="movie-form" onSubmit={submitHandler}>
			<h2>Movie Form</h2>
			<div className="line-input line-title">
				<label htmlFor="movie-title">Title</label>
				<input id="movie-title" type="text" onChange={titleChangeHandler} required />
			</div>
			<div className="line-input genre-rating">
				<InputRating
					rating={rating}
					onRatingChange={(newValue: number) => setRating(newValue)}
				/>
				<div className="genre-wrapper">
					<label htmlFor="genre">
						Genre <span>(max 4 genres)</span>
					</label>
					<select id="genre" defaultValue="Other" onChange={genreChangeHandler} required>
						{GenreList.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
				{genreList.length !== 0 && <ul>{genreListElements}</ul>}
			</div>

			<div className="line-input line-url">
				<label htmlFor="movie-url">Image Url</label>
				<input id="movie-url" type="text" onChange={imgUrlChangeHandler} required />
			</div>

			<div className="line-input line-optional">
				<h3>Optional</h3>
				<div className="producer-wrapper wrapper">
					<label htmlFor="movie-company">Production Company</label>
					<input
						id="movie-company"
						type="text"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setProducer(e.target.value.trim() as string)}
						required
					/>
				</div>
				<div className="director-wrapper wrapper">
					<label htmlFor="movie-director">Director</label>
					<input
						id="movie-director"
						type="text"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setDirector(e.target.value.trim())}
						required
					/>
				</div>

				<div className="year-wrapper wrapper">
					<label htmlFor="movie-year">
						Year <span>(1970~2022)</span>
					</label>
					<input
						id="movie-year"
						type="number"
						min="1970"
						max="2022"
						onChange={yearChangeHandler}
						required
					/>
				</div>
				<div className="duration-wrapper wrapper">
					<div>Duration</div>
					<div className="input-hours">
						<input
							id="movie-duration"
							name="movie-duration"
							type="number"
							min="0"
							max="10"
							defaultValue={0}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								dispatchDuration({
									type: "HOURS",
									newHours: +e.target.value
								})}
							required
						/>{" "}
						<label htmlFor="movie-duration">h</label>
					</div>
					<div className="input-minutes">
						<input
							id="movie-duration"
							name="movie-duration"
							type="number"
							min="0"
							max="59"
							defaultValue={0}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								dispatchDuration({
									type: "MINUTES",
									newMinutes: +e.target.value
								})}
							required
						/>{" "}
						<label htmlFor="movie-duration">m</label>
					</div>
				</div>
			</div>

			<div className="line-input line-description">
				<h3>Description & Comment</h3>
				<textarea onChange={descChangeHandler} required />
			</div>

			<div className="line-input button-wrapper">
				<button className="btn-gen">Submit</button>
			</div>
		</form>
	);
};

export default Movieform;
