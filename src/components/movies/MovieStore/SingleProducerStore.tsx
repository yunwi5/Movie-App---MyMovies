import React, { useContext, useMemo } from 'react';

import MovieContext from '../../../store/movie-context';
import Movie, { ProductionCompany } from '../../../models/Movie';
import MovieScrollbar from './MovieScrollbar';
import sortMovies, { concatUniqueMovies } from '../../../utilities/movie-util/movies-util';
import { Direction, SortingStandard } from '../../../models/helperModels';

interface Props {
    movies: Movie[];
    producer: ProductionCompany;
    logo: JSX.Element;
}

const SingleProducerStore: React.FC<Props> = (props) => {
    const { movies, producer, logo } = props;
    const moviesCount = movies.length;

    const storeMovies = useContext(MovieContext).storeMovies;
    const concatedMovies = concatUniqueMovies(movies, storeMovies);

    const suggestedMovies = useMemo(() => {
        return [...concatedMovies];
    }, [concatedMovies]);
    const highestRatedMovies = useMemo(
        () =>
            sortMovies([...concatedMovies], SortingStandard.RATING, Direction.DESCENDING) ||
            concatedMovies,
        [concatedMovies],
    );
    const newestMovies = useMemo(
        () =>
            sortMovies([...concatedMovies], SortingStandard.YEAR, Direction.DESCENDING) ||
            concatedMovies,
        [concatedMovies],
    );

    return (
        <main className="single-producer-store">
            <section className="producer-section producer-section--long">
                <div className="section-header">
                    <h1 className="heading">
                        {producer} <br /> <p>({moviesCount}+ Movies)</p>
                    </h1>
                    {logo}
                </div>
                <MovieScrollbar
                    movies={newestMovies}
                    listTag={'Hot & Newest'}
                    showLinkAndShuffle={false}
                />
                <MovieScrollbar
                    movies={highestRatedMovies}
                    listTag={'Highest Rated'}
                    showLinkAndShuffle={false}
                />
                <MovieScrollbar
                    movies={suggestedMovies}
                    listTag={'Suggestion For You'}
                    showLinkAndShuffle={false}
                />
            </section>
        </main>
    );
};

export default SingleProducerStore;
