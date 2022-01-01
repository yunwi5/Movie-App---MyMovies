import React from "react";
import Movie from "../../../models/Movie";
import GenreSection from "./GenreSection";

interface Props {
	genreStoresList: Array<{
		imgUrl: string;
		movies: Movie[];
		genre: string;
	}>;
}

const AllGenresStore: React.FC<Props> = ({ genreStoresList }) => {
	return (
		<main className="genre-stores-container">
			<ul>
				{genreStoresList.map((genreStore, idx) => (
					<GenreSection
						key={idx}
						movies={genreStore.movies}
						genre={genreStore.genre}
						imgUrl={genreStore.imgUrl}
					/>
				))}
			</ul>
		</main>
	);
};

export default AllGenresStore;
