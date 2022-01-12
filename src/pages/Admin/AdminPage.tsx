import React, { useState, useContext } from "react";
import {
	addAllMoviesToDb,
	getAllMoviesFromDb
} from "../../api/store-movie-api";
import MoviesContext from "../../store/movie-context";
import Movie from "../../models/Movie";

const AdminPage: React.FC = () => {
	const moviesCtx = useContext(MoviesContext);
	const storeMovies = moviesCtx.storeMovies;

	const [ testingMovies, setTestingMovies ] = useState<Movie[]>([]);

	const postAllMoviesHandler = () => {
		addAllMoviesToDb(storeMovies);
	};

	const getAllMoviesHandler = async () => {
		const moviesArray = await getAllMoviesFromDb();
		setTestingMovies(moviesArray || []);
	};

	return (
		<main className="admin-page">
			<h3 className="admin-page__heading">Admin Page</h3>
			<section className="movie-control">
				<div className="movie-action">
					<h4>Add all movies to the database</h4>
					<button
						className="btn btn-secondary-fill"
						onClick={postAllMoviesHandler}
					>
						Execute
					</button>
				</div>
				<div className="movie-action">
					<h4>Retrieve all movies from the database</h4>
					<button
						className="btn btn-secondary-fill"
						onClick={getAllMoviesHandler}
					>
						Execute
					</button>
				</div>
			</section>

			<section>
				{testingMovies.length ? (
					<div>
						<ul>
							{testingMovies.map((m) => (
								<li key={m.id}>
									<div>
										<div>{m.title}</div>
										<div>
											{m.producer}, {m.year}
										</div>
										<div>
											from store:{" "}
											{m.isFromStore ? "Yes" : "No"}
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					""
				)}
			</section>
		</main>
	);
};

export default AdminPage;
