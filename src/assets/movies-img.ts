const animeUrl =
	"https://jw-webmagazine.com/wp-content/uploads/2021/07/Violet-Evergarden.jpg";

// ACTION & ADVENTURES
const actionUrl =
	"https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/21/1495551278-guardians-of-the-galaxy-vol-2-cast.jpg?crop=1xw:0.8912655971479501xh;center,top&resize=1200:*";

const actionUrlStore =
	"https://static2.srcdn.com/wordpress/wp-content/uploads/2020/02/Avengers-endgame.jpeg?q=50&fit=crop&w=963&h=481&dpr=1.5";

// SCIENCE FICTION
const sciUrl =
	"https://qph.fs.quoracdn.net/main-qimg-17cda6bcacc8197c34ea7add5d476470.webp";

const sciUrlStore =
	"https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Inception-Feature.jpg";

// THRILLER
const thrillerUrl =
	"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/03-the-joker-w1200-h630-1562679871.jpg?crop=1xw:0.9523809523809523xh;center,top&resize=1200:*";

const tvShowUrl =
	"https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5fa80f666195861e90269d23%2FQueen-s-Gambit%2F960x0.jpg%3Ffit%3Dscale";

const romaticUrl =
	"https://focusmicrositesprod.s3.amazonaws.com/assets/uploads/post_5953d6733a487.jpg";

const dramaUrl =
	"https://www.indiewire.com/wp-content/uploads/2016/08/20140216-131646.jpg";

const documentaryUrl =
	"https://www.televisual.com/wp-content/uploads/3_1571413618_screen-shot-2019-10-18-at-16.40.40.jpg";

const childUrl =
	"https://www.denofgeek.com/wp-content/uploads/2019/02/how-to-train-your-dragon-the-hidden-world.jpg?fit=825%2C464";

const comediesUrl =
	"https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2015/07/07/Weekend/Images/wk-minions0710-5.jpg?t=20170517";

const musicalUrl =
	"https://images.indianexpress.com/2016/12/la-la-land-7592.jpg";

const horrorUrl =
	"https://uproxx.com/wp-content/uploads/2020/12/INVISIBLE-MAN.jpg";

export const getGenreImgUrl = (genre: string) => {
	switch (genre) {
		case "Anime":
			return animeUrl;
		case "Action & Adventures":
			return actionUrl;
		case "Science-Fiction & Fantasy":
			return sciUrl;
		case "Thriller":
			return thrillerUrl;
		case "TV Shows":
			return tvShowUrl;
		case "Romantic Movies":
			return romaticUrl;
		case "Comedies":
			return comediesUrl;
		case "Music & Musicals":
			return musicalUrl;
		case "Drama":
			return dramaUrl;
		case "Documentaries":
			return documentaryUrl;
		case "Children & Family Movies":
			return childUrl;
		case "Horror":
			return horrorUrl;
		default:
			return animeUrl;
	}
};

export const getGenreImgUrlStore = (genre: string) => {
	switch (genre) {
		case "Anime":
			return animeUrl;
		case "Action & Adventures":
			return actionUrlStore;
		case "Science-Fiction & Fantasy":
			return sciUrlStore;
		case "Thriller":
			return thrillerUrl;
		case "TV Shows":
			return tvShowUrl;
		case "Romantic Movies":
			return romaticUrl;
		case "Comedies":
			return comediesUrl;
		case "Music & Musicals":
			return musicalUrl;
		case "Drama":
			return dramaUrl;
		case "Documentaries":
			return documentaryUrl;
		case "Children & Family Movies":
			return childUrl;
		case "Horror":
			return horrorUrl;
		default:
			return animeUrl;
	}
};
