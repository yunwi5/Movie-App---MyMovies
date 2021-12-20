import React from 'react';
import { useParams } from 'react-router-dom';
import MoviesList from '../components/movies/MoviesList';

const MoviesSearch: React.FC = () => {
	const params = useParams();
	const searchWord = params.searchWord;

	return <MoviesList searchWord={searchWord} />;
};

export default MoviesSearch;
