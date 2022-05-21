import React, { useMemo } from 'react';
import Movie from '../../../models/Movie';
import MovieScrollbar from './MovieScrollbar';
import { getDarkenBackground } from '../../../utilities/design-util/style-util';
import { getGenreImgUrls } from '../../../assets/genre-img';
import sortMovies, { getMoviesAndUrlForGenre } from '../../../utilities/movie-util/movies-util';
import { Direction, SortingStandard } from '../../../models/helperModels';

interface Props {
    singleGenreStore: {
        imgUrl: string;
        movies: Movie[];
        genre: string;
    };
}

const SingleGenreStore: React.FC<Props> = ({ singleGenreStore }) => {
    const { movies, genre } = singleGenreStore;

    const { movies: genreMovies } = getMoviesAndUrlForGenre(genre as any, movies);
    const moviesCount = genreMovies.length;

    const [imageOne, imageTwo] = getGenreImgUrls(genre as any);

    // Use this Style Object if Background Image is needed.
    const backgroundStyle1 = getDarkenBackground(imageOne);
    const backgroundStyle2 = getDarkenBackground(imageTwo);

    const suggestedMovies = [...genreMovies];
    const highestRatedMovies = useMemo(
        () => sortMovies([...genreMovies], SortingStandard.RATING, Direction.DESCENDING),
        [genreMovies],
    );
    const newestMovies = useMemo(
        () => sortMovies([...genreMovies], SortingStandard.YEAR, Direction.DESCENDING),
        [genreMovies],
    );

    // Uses several scroll bars.
    return (
        <main className="single-genre-store">
            <section className="genre-section genre-section--long">
                <h1 className="heading">
                    {genre} <br /> <p>({moviesCount}+ Movies)</p>
                </h1>
                <MovieScrollbar
                    movies={newestMovies}
                    genre={genre}
                    listTag={'Hot & Newest'}
                    showLinkAndShuffle={false}
                />
                <MovieScrollbar
                    movies={highestRatedMovies}
                    genre={genre}
                    listTag={'Highest Rated'}
                    showLinkAndShuffle={false}
                />
                <MovieScrollbar
                    movies={suggestedMovies}
                    genre={genre}
                    listTag={'Suggestion For You'}
                    showLinkAndShuffle={false}
                />

                {/* 2 background images */}
                <div className="bg bg-1" style={backgroundStyle1} />
                <div className="bg bg-2" style={backgroundStyle2} />
            </section>
        </main>
    );
};

export default SingleGenreStore;
