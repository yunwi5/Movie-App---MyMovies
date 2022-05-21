import React, { useState, useEffect, Fragment } from 'react';
import MovieEditIcon from '../../../UI/IconElement/EditIcon';

interface InputProps {
    defaultValue: string;
    isEditing: boolean;
    onStartEdit: () => void;
    onConfirm: (newList: string) => void;
    onCancel: () => void;
}

// This component uses GenreList.
// This means it cannot be just string. This component will use separate reducer.
// Or JSON.stringify()?
const DurationEdit: React.FC<InputProps> = (props) => {
    const { defaultValue, isEditing, onStartEdit, onConfirm, onCancel } = props;

    const defaultList = JSON.parse(defaultValue);
    const [genres, setGenres] = useState<string[]>(defaultList);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);

    const addGenreHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (genres.length >= 4) {
            setWarningMessage('You can add maximum 4 genres');
            return;
        }
        const enteredGenre = e.target.value;
        // Add genre to the list ONLY IF the genreList does not contain the item.
        if (genres.includes(enteredGenre)) return;
        setGenres([...genres, enteredGenre]);
    };

    const removeGenreHandler = (clickedGenre: string) => {
        if (genres.length <= 1) {
            setWarningMessage('Your movie should have at least 1 genre');
            return;
        }

        if (genres.includes(clickedGenre)) {
            const newGenres = genres.filter((g) => g !== clickedGenre);
            setGenres(newGenres);
        }
    };

    const cancelHandler = () => {
        setGenres(defaultList);
        setWarningMessage(null);
        onCancel();
    };

    const confirmHandler = () => {
        setWarningMessage(null);
        onConfirm(JSON.stringify(genres));
    };

    const genresLength = genres.length;
    useEffect(() => {
        if (genresLength >= 1 && genresLength < 4) {
            setWarningMessage(null);
        }
    }, [genresLength]);

    return (
        <div className={`line-input__item--genres`}>
            <label htmlFor="genres" className="item-label">
                <span className="item-label__name">
                    Genres <span className="item-label__name--small">(max 4)</span>
                </span>
                <MovieEditIcon
                    isEditing={isEditing}
                    onStartEdit={onStartEdit}
                    onCancel={cancelHandler}
                    onConfirm={confirmHandler}
                />
            </label>
            {isEditing && (
                <Fragment>
                    <select id="genre" defaultValue="Other" onChange={addGenreHandler} required>
                        <option value="Anime">Anime</option>
                        <option value="Drama">Drama</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Horror">Horror</option>
                        <option value="Children & Family Movies">Children & Family Movies</option>
                        <option value="TV Shows">TV Shows</option>
                        <option value="Romantic Movies">Romantic Movies</option>
                        <option value="Comedies">Comedies</option>
                        <option value="Music & Musicals">Music & Musicals</option>
                        <option value="Sci-Fiction & Fantasy">Sci-Fiction & Fantasy</option>
                        <option value="Action & Adventures">Action & Adventures</option>
                        <option value="Documentaries">Documentaries</option>
                        <option value="Other">Other</option>
                    </select>
                    <ul className="genre-list">
                        {genres.map((genre, idx) => (
                            <li onClick={removeGenreHandler.bind(null, genre)} key={idx}>
                                <i className="fa fa-angle-right" />
                                <span>{genre}</span>
                            </li>
                        ))}
                    </ul>
                    {warningMessage ? <p className="warning-message">{warningMessage}</p> : ''}
                </Fragment>
            )}
            {!isEditing && (
                <ul>
                    {genres.map((genre, idx) => (
                        <li key={idx}>
                            <i className="fa fa-angle-right" />
                            <span>{genre}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DurationEdit;
