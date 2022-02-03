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
		default:
			return [ animeUrl1, animeUrl2 ];
	}
}
