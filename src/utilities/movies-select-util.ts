import Movie from "../models/Movie";

function haveSameGenre (movieA: Movie, movieB: Movie) {
	for (const genre of movieB.genreList) {
		if (movieA.genreList.indexOf(genre) !== -1) return true;
	}
	return false;
}

function haveSameProducer (movieA: Movie, movieB: Movie) {
	if (!movieA.producer || !movieB.producer) return false;

	const producerA = movieA.producer.toLowerCase();
	const firstWordA = producerA.split(" ")[0];

	const producerB = movieB.producer.toLowerCase();
	const firstWordB = producerB.split(" ")[0];

	if (firstWordA === firstWordB) return true;

	return producerA.includes(producerB) || producerB.includes(producerA);
}

const getSimilarMovies = (movies: Movie[], movie: Movie) => {
	let similarMovies: Movie[] = [];
	for (const m of movies) {
		if (haveSameGenre(movie, m) || haveSameProducer(movie, m)) {
			similarMovies.push(m);
		}
	}
	return similarMovies;
};

export default getSimilarMovies;
