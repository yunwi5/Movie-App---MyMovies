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

function haveSameDirector (movieA: Movie, movieB: Movie) {
	if (!movieA.director || !movieB.director) return false;

	const directorA = movieA.director.toLowerCase();
	const directorB = movieB.director.toLowerCase();

	return directorA.includes(directorB) || directorB.includes(directorA);
}

const MOVIES_TO_SHOW = 6;

const getSimilarMovies = (movies: Movie[], movie: Movie) => {
	let priorityList: Movie[] = [];
	let primaryList: Movie[] = [];
	let secondaryList: Movie[] = [];
	let tertiaryList: Movie[] = [];
	let remainingList: Movie[] = [];

	let bookCount = 0;

	for (const m of movies) {
		if (m.id === movie.id) continue;

		const isSameDirector = haveSameDirector(m, movie);
		const isSameProducer = haveSameProducer(m, movie);
		const isSameGenre = haveSameGenre(m, movie);

		if (isSameDirector) {
			priorityList.push(m);
			bookCount++;
		} else if (isSameProducer && isSameGenre) {
			primaryList.push(m);
		} else if (isSameProducer) {
			secondaryList.push(m);
		} else if (isSameGenre) {
			tertiaryList.push(m);
		} else {
			remainingList.push(m);
		}
	}

	if (bookCount < MOVIES_TO_SHOW) {
		for (const m of primaryList) {
			if (bookCount >= MOVIES_TO_SHOW) break;
			priorityList.push(m);
			bookCount++;
		}
	}

	if (bookCount < MOVIES_TO_SHOW) {
		for (const m of secondaryList) {
			if (bookCount >= MOVIES_TO_SHOW) break;
			priorityList.push(m);
			bookCount++;
		}
	}

	if (bookCount < MOVIES_TO_SHOW) {
		for (const m of tertiaryList) {
			if (bookCount >= MOVIES_TO_SHOW) break;
			priorityList.push(m);
			bookCount++;
		}
	}

	if (bookCount < MOVIES_TO_SHOW) {
		for (const m of remainingList) {
			if (bookCount >= MOVIES_TO_SHOW) break;
			priorityList.push(m);
			bookCount++;
		}
	}

	return priorityList;
};

export default getSimilarMovies;
