import { Fragment } from "react";
import Searchbar from "../../../UI/Search/CommentSearchbar";

interface Props {
	onRatingFilter: (ratingFilter: string) => void;
	onSearchFilter: (searchFilter: string) => void;
}

const ReviewFilter: React.FC<Props> = (props) => {
	const { onRatingFilter, onSearchFilter } = props;

	function changeFilterHandler (e: React.ChangeEvent<HTMLSelectElement>) {
		const selectedFilter = e.target.value.trim();
		onRatingFilter(selectedFilter);
	}

	function searchbarHandler (newSearchWord: string) {
		console.log("search word:", newSearchWord);
		onSearchFilter(newSearchWord);
	}

	return (
		<Fragment>
			<select className="review-filter" onChange={changeFilterHandler}>
				<option>All ratings</option>
				<option>8 to 10</option>
				<option>6 to 8</option>
				<option>4 to 6</option>
				<option>2 to 4</option>
				<option>0 to 2</option>
			</select>
			<Searchbar onSearch={searchbarHandler} placeHolder={"Search Reviews"} />
		</Fragment>
	);
};

export default ReviewFilter;
