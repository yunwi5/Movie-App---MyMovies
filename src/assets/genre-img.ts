import { Genre } from "../models/Movie";

const animeUrl1 =
	"https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SQSBAJOSTJD4BKWKHQUC45VYT4.jpg";
const animeUrl2 =
	"https://www.cheatsheet.com/wp-content/uploads/2021/08/Eren-Jaeger-in-titan-form-in-Attack-on-Titan-The-Final-Season.jpg";

const actionsAdventuresUrl1 = "https://cdn.mos.cms.futurecdn.net/YdAaqJNxhLZ66zmRZ3T58D.jpg";
const actionsAdventuresUrl2 =
	"https://www.videogameschronicle.com/files/2020/01/rise-of-the-tomb-raider.jpg";

const sciFictionUrl1 =
	"https://www.denofgeek.com/wp-content/uploads/2018/02/geostorm_main.jpg?fit=1920%2C1080";
const sciFictionUrl2 =
	"http://static1.squarespace.com/static/52431224e4b090a5255220af/t/55354072e4b0f20e2b641748/1429553270066/?format=1500w";

const romanticUrl1 =
	"https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABd78bgTc1WynTY8CrIXrKCPsN1G1W8QvjLQwOhtVI0z8M_GzMD8FHAo5bBf-Wo0j_-KFv67dnYQmmuOJxseW8LWIY82J.jpg?r=ece";
const romanticUrl2 =
	"https://static01.nyt.com/images/2020/12/24/arts/24bridgerton-review/24bridgerton-review-mobileMasterAt3x-v2.jpg";

const documentaryUrl1 =
	"https://www.wwf.org.uk/sites/default/files/styles/social_share_image/public/2018-11/Copy%20of%20OURPLANET_LD_STEVEBENJAMIN_LOGO_0.jpg?itok=UtyIUKRO";
const documentaryUrl2 =
	"https://viewpoint.pointloma.edu/wp-content/uploads/2019/09/Cabo-Pulmo-Ocean_Dive-scaled.jpg";

const childrenUrl1 =
	"https://cdn.vox-cdn.com/thumbor/idk0lD6_3BbFwVH9iyr2RVNDf4c=/368x0:1440x603/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/53858819/Screen_Shot_2017_01_31_at_1.57.35_PM.0.png";
const childrenUrl2 =
	"https://www.awn.com/sites/default/files/styles/large_featured/public/image/featured/1027052-zootopia-disney-s-latest-and-greatest-animal-kingdom.jpg?itok=l0QTvJCr";

const thrillerUrl1 =
	"https://static0.srcdn.com/wordpress/wp-content/uploads/2017/12/Margot-Robbie-and-Jared-Leto-in-Harley-Quinn-Joker-movie.jpg?q=50&fit=crop&w=963&h=481&dpr=1.5";
const thrillerUrl2 =
	"https://www.denofgeek.com/wp-content/uploads/2017/01/split_ending_anya_taylor_joy.jpg";

const comedyUrl1 =
	"https://assets-prd.ignimgs.com/2021/11/12/encanto-blogroll-01-1636743223845.jpg";
const comedyURl2 =
	"https://www.denofgeek.com/wp-content/uploads/2021/08/Free-Guy.jpg?fit=1800%2C1012";

const dramaUrl1 =
	"https://i0.wp.com/dmtalkies.com/wp-content/uploads/2021/12/ezgif-7-859c7746c3dd-compressed.jpg?fit=1200%2C675&ssl=1";
const dramaUrl2 =
	"https://media.npr.org/assets/img/2020/09/16/datt_unit_03797r2_wide-650c7cbe63026da43dcccf8ae7b2327b69e5e97b.jpg";

const musicalUrl1 =
	"https://www.newstatesman.com/wp-content/uploads/sites/2/2021/11/202145-Film.jpg";
const musicalUrl2 = "https://cdn.cnn.com/cnnnext/dam/assets/181102201749-bohemian-rhapsody.jpg";

const tvShowUrl1 =
	"https://media.glamour.com/photos/5ef3ac1aeb362744ccc034c4/master/w_3200,h_1800,c_limit/sweet-magnolias-lede_social.jpg";
const tvShowUrl2 =
	"https://media.newyorker.com/photos/5fab116f3f5e6c06f138f155/master/pass/Chayka-ambient-tv-1.jpg";

const horrorUrl1 = "https://indexmovie.net/img/tt10039344/backdrop_tt10039344.jpg";
const horrorUrl2 =
	"https://www.teahub.io/photos/full/257-2574382_underwater-movie-4k-wallpaper-underwater-movie-final-monster.jpg";

export function getGenreImgUrls (genre: Genre): [string, string] {
	switch (genre) {
		case Genre.ANIME:
			return [ animeUrl1, animeUrl2 ];
		case Genre.CHILDREN_FAMILY:
			return [ childrenUrl1, childrenUrl2 ];
		case Genre.ACTION_ADVENTURES:
			return [ actionsAdventuresUrl1, actionsAdventuresUrl2 ];
		case Genre.SCI_FICTION_FANTASY:
			return [ sciFictionUrl1, sciFictionUrl2 ];
		case Genre.ROMANTIC:
			return [ romanticUrl1, romanticUrl2 ];
		case Genre.DOCUMENTARIES:
			return [ documentaryUrl1, documentaryUrl2 ];
		case Genre.THRILLER:
			return [ thrillerUrl1, thrillerUrl2 ];
		case Genre.COMEDIES:
			return [ comedyUrl1, comedyURl2 ];
		case Genre.DRAMA:
			return [ dramaUrl1, dramaUrl2 ];
		case Genre.MUSICALS:
			return [ musicalUrl1, musicalUrl2 ];
		case Genre.TV_SHOWS:
			return [ tvShowUrl1, tvShowUrl2 ];
		case Genre.HORROR:
			return [ horrorUrl1, horrorUrl2 ];
		default:
			return [ animeUrl1, animeUrl2 ];
	}
}
