import { isUpperCase } from "../utilities/string-util";

export function getYearGenreDurationFormat(yearGenreDuration) {
    if (!yearGenreDuration || yearGenreDuration.length < 1) return {};

    let genre = yearGenreDuration.split('‧')[1].trim();

    const arr = yearGenreDuration.split(' ');
    let year, hours, minutes;
    for (let word of arr) {
        if (!isNaN(word) && word.length) year = parseInt(word);
        else if (word.includes('h')) {
            hours = parseInt(word.slice(0, word.length - 1));
        } else if (word.includes('m')) {
            minutes = parseInt(word.slice(0, word.length - 1));
        }
    }

    return {
        genre,
        year,
        hours,
        minutes,
    };
}

export function getDirectorAndProducers(movieCardContent) {
    const directorLabel = 'Director:'
    const directorPosition = movieCardContent.search(directorLabel);
    const arrayFromDirector = movieCardContent.substring(directorPosition + directorLabel.length).trim().split(' ');

    let directorArr = [];
    let foundedAll = false;
    for (let word of arrayFromDirector) {
        const wordFrom2ndPos = word.substring(1);

        for (let i = 0; i < wordFrom2ndPos.length; i++) {
            const char = wordFrom2ndPos[i];
            if (isUpperCase(char)) {
                directorArr.push(word.substring(0, i + 1));
                foundedAll = true;
                break;
            }
        }
        if (foundedAll) break;
        directorArr.push(word);
    }
    const director = directorArr.join(' ');

    const producerLabel = 'Distributed by:';
    const producerPosition = movieCardContent.search(producerLabel);
    const producers = movieCardContent.substring(producerPosition + producerLabel.length).trim().split(', ');

    return {
        director,
        producers
    }
}

export function getRatingAsNumber(ratingText) {
    if (!ratingText) return 0;
    const userRating = parseFloat(ratingText.split('/')[0]);
    return userRating;
}