import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faShuffle } from "@fortawesome/pro-light-svg-icons";
import { faStar as solidFaStar } from "@fortawesome/pro-solid-svg-icons";
import { faStar as lightFaStar } from "@fortawesome/pro-light-svg-icons";

interface Props {
	onShowSidebar: () => void;
	sortingStandard: string;
	onSortingStandard: (standard: string) => void;
	sortingDirection: string;
	onSortingDirection: (direction: string) => void;
	onShuffle: () => void;
	onToggleFavorite: () => void;
	showOnlyFav: boolean;
	moviesLength: number;
}

const MovieSearchbar: React.FC<Props> = (props) => {
	const {
		onShowSidebar,
		sortingStandard,
		onSortingStandard,
		sortingDirection,
		onSortingDirection,
		onShuffle,
		onToggleFavorite,
		showOnlyFav,
		moviesLength
	} = props;

	return (
		<div className="select-wrapper">
			<button className="btn-filter" onClick={onShowSidebar}>
				<i className="fa fa-filter" />
				&ensp;Filter
			</button>
			<FormControl
				className="movie-select"
				variant={sortingStandard ? "filled" : "standard"}
				sx={{ m: 1, minWidth: 120, fontSize: 50 }}
			>
				<InputLabel id="simple-sort-standard-label">Sort by</InputLabel>
				<Select
					label="Sort by"
					labelId="simple-sort-standard-label"
					id="simple-sort-standard"
					defaultValue=""
					value={sortingStandard}
					onChange={(e: SelectChangeEvent) => {
						onSortingStandard(e.target.value as string);
					}}
				>
					<MenuItem value="rating">Rating</MenuItem>
					<MenuItem value="title">Title</MenuItem>
					<MenuItem value="year">Year</MenuItem>
				</Select>
			</FormControl>
			<FormControl
				className="movie-select"
				variant={sortingDirection ? "filled" : "standard"}
				sx={{ m: 1, minWidth: 120 }}
			>
				<InputLabel id="simple-sort-direction-label">Direction</InputLabel>
				<Select
					label="Direction"
					labelId="simple-sort-direction-label"
					id="simple-sort-direction"
					defaultValue=""
					value={sortingDirection}
					onChange={(event: SelectChangeEvent<unknown>) => {
						onSortingDirection(event.target.value as string);
					}}
				>
					<MenuItem value="ASC">Ascending</MenuItem>
					<MenuItem value="Des">Descending</MenuItem>
				</Select>
			</FormControl>
			<div onClick={onToggleFavorite}>
				{showOnlyFav ? (
					<FontAwesomeIcon className="icon" icon={solidFaStar} />
				) : (
					<FontAwesomeIcon className="icon" icon={lightFaStar} />
				)}
			</div>
			<div className="shuffle-icon-wrapper" onClick={onShuffle}>
				<FontAwesomeIcon className="icon" icon={faShuffle as IconProp} />
			</div>

			<span>{moviesLength} Movies</span>
		</div>
	);
};

export default MovieSearchbar;
