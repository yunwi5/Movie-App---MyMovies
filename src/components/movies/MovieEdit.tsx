import { useReducer, useContext, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Movie from "../../models/Movie";
import MovieContext from "../../store/movie-context";
import TextEdit from "./MovieEdit/TextEdit";
import DurationEdit from "./MovieEdit/DurationEdit";
import RatingEdit from "./MovieEdit/RatingEdit";
import GenreEdit from "./MovieEdit/GenreEdit";

import SuccessModal from '../UI/Modal/SuccessModal';

export enum InputType {
	TEXT = "text",
	TEXT_AREA = "textarea",
	NUMBER = "number",
	RATING = "rating"
}

enum EditState {
	START_EDIT = "startEdit",
	CONFIRM_EDIT = "confirmEdit",
	CANCEL_EDIT = "cancelEdit"
}

type Action = {
	type: string;
	value: string | null;
};

type State = {
	defaultValue: string;
	changedValue: string | null;
	isEditing: boolean;
};

const textInputReducer = (state: State, action: Action) => {
	if (action.type === EditState.START_EDIT) {
		// console.log("stat editing!", state.changedValue);
		return { ...state, isEditing: true };
	}
	if (action.type === EditState.CANCEL_EDIT) {
		// console.log("cancel editing!", state.changedValue);
		return { ...state, changedValue: state.defaultValue, isEditing: false };
	}
	if (action.type === EditState.CONFIRM_EDIT) {
		// console.log("confirm editing!", state.changedValue, action.value);
		const newDefaultValue = action.value || state.defaultValue;
		return { defaultValue: newDefaultValue, isEditing: false, changedValue: newDefaultValue };
	}

	return state;
};

const MovieEdit: React.FC<{ movie: Movie }> = ({ movie }) => {
	const navigate = useNavigate();
	const movieCtx = useContext(MovieContext);

	const [showModal, setShowModal] = useState(false);

	const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

	const [ urlState, dispatchUrl ] = useReducer(textInputReducer, {
		defaultValue: movie!.imgUrl,
		changedValue: movie!.imgUrl,
		isEditing: false
	});

	const [ titleState, dispatchTitle ] = useReducer(textInputReducer, {
		defaultValue: movie!.title,
		changedValue: movie!.title,
		isEditing: false
	});

	const [ producerState, dispatchProducer ] = useReducer(textInputReducer, {
		defaultValue: movie!.producer || "",
		changedValue: movie!.producer,
		isEditing: false
	});

	const [ directorState, dispatchDirector ] = useReducer(textInputReducer, {
		defaultValue: movie!.director || "",
		changedValue: movie!.director,
		isEditing: false
	});

	// Receive user input as String!
	const [ yearState, dispatchYear ] = useReducer(textInputReducer, {
		defaultValue: "" + movie!.year || "",
		changedValue: "" + movie!.year,
		isEditing: false
	});

	// Receive user input as String!
	const [ durationState, dispatchDuration ] = useReducer(textInputReducer, {
		defaultValue: "" + movie!.duration || "",
		changedValue: "" + movie!.duration,
		isEditing: false
	});

	const [ descState, dispatchDesc ] = useReducer(textInputReducer, {
		defaultValue: movie!.description || "",
		changedValue: movie!.description,
		isEditing: false
	});

	const [ ratingState, dispatchRating ] = useReducer(textInputReducer, {
		defaultValue: "" + movie.rating,
		changedValue: "" + movie.rating,
		isEditing: false
	});

	const [ genresState, dispatchGenres ] = useReducer(textInputReducer, {
		defaultValue: JSON.stringify(movie.genreList),
		changedValue: JSON.stringify(movie.genreList),
		isEditing: false
	});

	const submitHandler = () => {
		const newUrl = urlState.changedValue || movie.imgUrl;
		const newTitle = titleState.changedValue || movie.title;
		const newProducer = producerState.changedValue;
		const newDirector = directorState.changedValue;
		const newDescription = descState.changedValue || movie.description;
		const yearInNumber = parseInt(yearState.changedValue || "" + movie.year);
		const durationInNumber = parseInt(durationState.changedValue || "" + movie.duration);
		const ratingInNumber = parseFloat(ratingState.changedValue || "" + movie.rating);
		// Genres are in string. Parse it.
		const genresInList = JSON.parse(genresState.changedValue || "");

		// Construct a new movie and then pass it to editMovie Fn.
		const newMovieObj: Movie = {
			...movie,
			imgUrl: newUrl,
			title: newTitle,
			producer: newProducer,
			director: newDirector,
			description: newDescription,
			year: yearInNumber,
			duration: durationInNumber,
			rating: ratingInNumber,
			genreList: genresInList,
			isFavorite
		};

		console.log(newMovieObj);
		movieCtx.editMovie(newMovieObj);
		setShowModal(true);
	};

	console.log(yearState.changedValue);

	const findMoreUrl = `https://www.google.com/search?q=${movie.title}`;

	const modalContent = {
		isSuccess: true, 
		message: `Your change on ${titleState.changedValue} is now permanent`,
		onClose: () => {
			navigate(`/movie-detail/user/${movie.id}`)
			setShowModal(false);
		}
	}

	return (
		<Fragment>
			{showModal && <SuccessModal modalContent={modalContent} /> }
			<main className="movie-edit">
				<h2>
					Edit & Customize &nbsp; {movie.title}
					<Link to={`#`} onClick={() => navigate(-1)}>
						Go Back<i className="fa fa-long-arrow-right" />
					</Link>
				</h2>

				<form className="edit-form" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
					<section className="edit-form__left">
						<div className="img-wrapper">
							<img src={movie.imgUrl} alt="movie img" />
						</div>
					</section>

					<section className="edit-form__right">
						<div className="line-input">
							<TextEdit
								name="Title"
								type={InputType.TEXT}
								defaultValue={titleState.defaultValue}
								isEditing={titleState.isEditing}
								onStartEdit={() =>
									dispatchTitle({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchTitle({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchTitle({ type: EditState.CONFIRM_EDIT, value })}
							/>
						</div>

						<div className="line-input">
							<TextEdit
								name="Image Url"
								type={InputType.TEXT}
								defaultValue={urlState.defaultValue}
								isEditing={urlState.isEditing}
								onStartEdit={() =>
									dispatchUrl({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchUrl({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchUrl({ type: EditState.CONFIRM_EDIT, value })}
							/>
						</div>

						<div className="line-input line-input--double">
							<RatingEdit
								defaultValue={ratingState.defaultValue}
								isEditing={ratingState.isEditing}
								onStartEdit={() =>
									dispatchRating({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchRating({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchRating({ type: EditState.CONFIRM_EDIT, value })}
							/>
							<GenreEdit
								defaultValue={genresState.defaultValue}
								isEditing={genresState.isEditing}
								onStartEdit={() =>
									dispatchGenres({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchGenres({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchGenres({ type: EditState.CONFIRM_EDIT, value })}
							/>
						</div>

						<div className="line-input line-input--double">
							<TextEdit
								name="Producer"
								type={InputType.TEXT}
								defaultValue={producerState.defaultValue}
								isEditing={producerState.isEditing}
								onStartEdit={() =>
									dispatchProducer({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchProducer({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchProducer({ type: EditState.CONFIRM_EDIT, value })}
							/>

							<TextEdit
								name="Director"
								type={InputType.TEXT}
								defaultValue={directorState.defaultValue}
								isEditing={directorState.isEditing}
								onStartEdit={() =>
									dispatchDirector({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchDirector({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchDirector({ type: EditState.CONFIRM_EDIT, value })}
							/>
						</div>

						<div className="line-input line-input--double">
							<TextEdit
								name="Year"
								type={InputType.NUMBER}
								defaultValue={yearState.defaultValue}
								isEditing={yearState.isEditing}
								onStartEdit={() =>
									dispatchYear({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchYear({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchYear({ type: EditState.CONFIRM_EDIT, value })}
							/>
							<DurationEdit
								defaultValue={durationState.defaultValue}
								isEditing={durationState.isEditing}
								onStartEdit={() =>
									dispatchDuration({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchDuration({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchDuration({ type: EditState.CONFIRM_EDIT, value })}
							/>
						</div>

						<div className="line-input">
							<TextEdit
								name="Description"
								type={InputType.TEXT_AREA}
								defaultValue={descState.defaultValue}
								isEditing={descState.isEditing}
								onStartEdit={() =>
									dispatchDesc({ type: EditState.START_EDIT, value: null })}
								onCancel={() =>
									dispatchDesc({ type: EditState.CANCEL_EDIT, value: null })}
								onConfirm={(value: string) =>
									dispatchDesc({ type: EditState.CONFIRM_EDIT, value })}
							/>
						</div>
						<div className="links">
							<button className="btn btn-secondary-fill"
								onClick={() => setIsFavorite(prev => !prev)}
							>
								{!isFavorite && <><i className="fa fa-star" ></i>Favorite</>}
								{isFavorite && <><i className="fa fa-star-o" ></i>Unfavorite</>}
							</button>
							<button className="btn btn-secondary-empty">
								<a href={findMoreUrl}>Find More</a>
							</button>
						</div>
					</section>
				</form>

				<div className="btn-wrapper">
					<button className="btn-gen" onClick={submitHandler}>
						Confirm
					</button>
				</div>
			</main>
		</Fragment>
	);
};

export default MovieEdit;
