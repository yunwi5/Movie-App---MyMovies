import { useState } from "react";

interface Props {
	onSearch: (searchWord: string) => void;
	placeHolder?: string;
}

const Searchbar: React.FC<Props> = ({ onSearch, placeHolder }) => {
	const [ searchWord, setSearchWord ] = useState("");

	function searchHandler (newWord: string) {
		onSearch(newWord);
		setSearchWord(newWord);
	}

	return (
		<div className="search-bar">
			<div className="search-front">
				<i className="fa fa-search" />
			</div>
			<input
				type="text"
				placeholder={`${placeHolder ? placeHolder : "Search"}`}
				value={searchWord}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					searchHandler(e.target.value)}
			/>
			{searchWord && (
				<span onClick={searchHandler.bind(null, "")}>
					<i className="fa fa-times" />
				</span>
			)}
		</div>
	);
};

export default Searchbar;
