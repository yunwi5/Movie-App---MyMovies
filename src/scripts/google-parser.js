import nightmare from "nightmare";
import { getYearGenreDurationFormat, getDirectorAndProducers, getRatingAsNumber } from "./parser-helper";

// const URL = 'https://www.google.com/search?q=your+name';
// const URL = 'https://www.google.com/search?q=the+dark+knight';
const URL = 'https://www.google.com/search?q=guardians+of+the+galaxy+2';

async function findDirectorAndProducers(nightmare) {
    const movieSection = await nightmare
        .goto(URL)
        .wait('#rhs')
        .evaluate(() => {
            const content = document.querySelector('div.UDZeY.fAgajc.OTFaAf:last-child, div.OTFaAf .wDYxhc span.LrzXr.kno-fv.wHYlTd.z8gr9e a.fl');
            return content ? content.textContent : '';
        });

    return movieSection;
}

async function findTitle(nightmare) {
    const movieTitle = await nightmare.goto(URL).wait('#rhs').evaluate(() => {
        const descContainer = document.querySelector('div.PyJv1b.gsmt.PZPZlf .yKMVIe, .SPZz6b h2.PZPZlf span');
        return descContainer ? descContainer.textContent : '';
    });
    return movieTitle;
}

async function findDescription(nightmare) {
    const movieDesc = await nightmare.goto(URL).wait('#rhs').evaluate(() => {
        const descContainer = document.querySelector('div.kno-rdesc span');
        return descContainer ? descContainer.textContent : '';
    });
    return movieDesc;
}

// a.NY3LVe span.IZACzd
async function findRating(nightmare) {
    // gsrt KMdzJ
    const movieRating = await nightmare.goto(URL).wait('body').evaluate(() => {
        const ratingElem = document.querySelector('span.IZACzd, span.gsrt.KMdzJ');
        return ratingElem ? ratingElem.textContent : '';
    });
    console.log('Raw movie rating:', movieRating);
    return movieRating;
}

async function findYearGenreDuration(nightmare) {
    // wwUB2c PZPZlf
    // 'div.EGmpye div.wx62f.PZPZlf.x7XAkb'
    const movieYearGenreDuration = await nightmare.goto(URL).wait('#rhs').evaluate(() => {
        const content = document.querySelector('div.EGmpye div.PZPZlf, .wwUB2c');
        return content ? content.textContent : '';
    });
    return movieYearGenreDuration;
}

async function findMovie(titleString = '') {
    const nm = nightmare();
    const desc = await findDescription(nm);
    const title = await findTitle(nm);
    const yearGenreDuration = await findYearGenreDuration(nm);
    const movieCardContent = await findDirectorAndProducers(nm);
    const ratingText = await findRating(nm);

    const { year, genre, hours, minutes } = getYearGenreDurationFormat(yearGenreDuration);
    const { director, producers } = getDirectorAndProducers(movieCardContent);
    const rating = getRatingAsNumber(ratingText);

    console.log(`title: ${title}`);
    console.log(`desc: ${desc}}`);
    console.log(`year: ${year}`);
    console.log(`genre: ${genre}`);
    console.log(`hours: ${hours}`);
    console.log(`minutes: ${minutes}`);
    console.log(`director: ${director}`);
    console.log(`producers: ${producers.join(' & ')}`);
    console.log(`rating: ${rating}`);
    await nm.end();

    return 0;
}
