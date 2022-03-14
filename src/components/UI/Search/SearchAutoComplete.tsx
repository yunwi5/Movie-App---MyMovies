import React from "react";

import Movie from "../../../models/Movie";
import { getSearchPartHighlighted } from "../../../utilities/design-util/text-style.util";

interface Props {
	items: Movie[];
	searchText: string;
	position: number | null;
	onSearch: (text: string) => void;
}

const SearchAutoComplete: React.FC<Props> = (props) => {
	const { searchText, items, position, onSearch } = props;

	return (
		<ul className="auto-complete-search-list">
			{items.map((movie, idx) => (
				<li
					key={movie.id}
					onClick={onSearch.bind(null, movie.title)}
					className={`auto-complete-item ${position === idx
						? "auto-complete-item--active"
						: ""}`}
				>
					<div className="poster-wrapper">
						<img src={movie.imgUrl} alt="" />
					</div>
					<p className="item-title">
						{getSearchPartHighlighted(movie.title, searchText)}
					</p>
				</li>
			))}
		</ul>
	);
};

export default SearchAutoComplete;
