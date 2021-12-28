import Movie from "../models/Movie";

const DUMMY_MOVIES: Movie[] = [
	{
		id: "m1",
		title: "Avengers Endgame",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
		rating: 9.8,
		description: "Avengers final series",
		producer: "Marvel Comics",
		director: "Joe Russo",
		duration: 182,
		year: 2019,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m2",
		title: "Avengers Infinity War",
		imgUrl:
			"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRc7qW-K_snQNkkJZ7ZLudrI63KmrUPfVG80OnuCdVMaHHKYovx",
		rating: 8.8,
		description: "Avengers 3rd series",
		producer: "Marvel Comics",
		director: "Anthony Russo & Joe Russo",
		duration: null,
		year: 2018,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m3",
		title: "The Dark Knight",
		imgUrl: "https://contentserver.com.au/assets/598411_p173378_p_v8_au.jpg",
		rating: 9.9,
		description: "Dark Knight 1st Series",
		producer: "DC Comics",
		director: "Christopher Nolan",
		duration: 152,
		year: 2009,
		genreList: [ "Action & Adventures", "Thriller" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m4",
		title: "Spider-Man Homecoming",
		imgUrl:
			"https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fmarkhughes%2Ffiles%2F2017%2F07%2FSPIDER-MAN-HOMECOMING-poster-10-1200x1777.jpg",
		rating: 9.0,
		description: "A new Spider-Man series",
		producer: "Marvel Comics",
		director: "Jon Watts",
		duration: null,
		year: 2017,
		genreList: [ "Action & Adventures" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m5",
		title: "The Suicide Squad",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_.jpg",
		rating: 7,
		description:
			"The government sends the most dangerous supervillains in the world -- Bloodsport, Peacemaker, King Shark, Harley Quinn and others -- to the remote, enemy-infused island of Corto Maltese. Armed with high-tech weapons, they trek through the dangerous jungle on a search-and-destroy mission, with only Col. Rick Flag on the ground to make them behave.",
		producer: "DC Comics",
		director: "James Gunn & David Ayer",
		duration: 132,
		year: 2016,
		genreList: [ "Action & Adventures" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m6",
		title: "Your Name",
		imgUrl: "https://contentserver.com.au/assets/525768_gnau_yourname_p_v7_aa.jpg",
		rating: 10,
		description:
			"Your Name is a 2016 Japanese animated romantic fantasy film produced by CoMix Wave Films and released by Toho.",
		producer: "CoMix",
		director: "Makoto Shinkai",
		duration: 112,
		year: 2016,
		genreList: [ "Anime", "Romantic Movies" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m8",
		title: "A Silent Voice",
		imgUrl:
			"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJrlYXvqlm1bAFMMfjhlX970K4B0z2AJv66KKb1Y9gW-4eml2X",
		rating: 8.7,
		description:
			"When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.",
		producer: "Kyoto Animation",
		director: "Naoko Yamada",
		duration: 129,
		year: 2016,
		genreList: [ "Anime", "Romantic Movies" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m9",
		title: "Inception",
		imgUrl:
			"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNg1yyRCc7-2j2DbylM7jKo4UqIUH97ZGVdQaIN7AoO_Cr54a5",
		rating: 9.3,
		description:
			"Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb's criminal history as payment for performing an inception on his sick competitor's son.",
		producer: "Legendary Pictures",
		director: "Christopher Nolan",
		duration: 148,
		year: 2010,
		genreList: [ "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m10",
		title: "Demon Slayer - Mugen Train",
		imgUrl:
			"https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2021/09/demonslayermugentraintvversionvisual.jpg?resize=696%2C984&ssl=1",
		rating: 7.9,
		description:
			"A boy raised by boars, who wears a boar's head, boards the Infinity Train on a new mission with the Flame Pillar along with another boy who reveals his true power when he sleeps. Their mission is to defeat a demon who has been tormenting people and killing the demon slayers who oppose it.",
		producer: "Ufotable",
		director: "Haruo Sotozaki",
		duration: 117,
		year: 2021,
		genreList: [ "Anime", "Action & Adventures" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m11",
		title: "Gekijouban Violet Evergarden",
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKZFUwe-bIEnEFz7cpbidW97sT-QULhQzWqczUqVZQGsIR52F",
		rating: 8.5,
		description:
			"Violet Evergarden struggles to cope with the loss of her mentor, Major Gilbert. But when she gets a job as a ghostwriter and begins to express the emotions of others, she comes to terms with her own.",
		producer: "Ufotable",
		director: "Taichi Ishidate",
		duration: 140,
		year: 2020,
		genreList: [ "Anime", "Romantic Movies" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m12",
		title: "Spider-man",
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8tNnqMFQf9D5OuQiQTKtHJx8dxAlF4iX8LYpQyzw1AAMq9YLl",
		rating: 7.8,
		description:
			"Peter Parker's life changes when he is bitten by a genetically altered spider and gains superpowers. He uses his powers to help people and finds himself facing the Green Goblin, an evil maniac.",
		producer: "Columbia Pictures & Marvel Enterprises",
		director: "Sam Raimi",
		duration: 121,
		year: 2002,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m13",
		title: "Spider-man2",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
		rating: 7.2,
		description:
			"Peter Parker is dissatisfied with life when he loses his job, the love of his life, Mary Jane, and his powers. Amid all the chaos, he must fight Doctor Octavius who threatens to destroy New York City.",
		producer: "Columbia Pictures & Marvel Enterprises",
		director: "Sam Raimi",
		duration: 127,
		year: 2004,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m14",
		title: "Spider-man3",
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmyRssPp6QwNUa0mgR96064m8x_52mrahSLn8Mtl1YYQYS_Yuf",
		rating: 6.2,
		description:
			"Peter Parker becomes one with a symbiotic alien that bolsters his Spider-Man avatar and affects his psyche. He also has to deal with Sandman and maintain a fragmented relationship with Mary Jane.",
		producer: "Columbia Pictures & Marvel Enterprises",
		director: "Sam Raimi",
		duration: 139,
		year: 2007,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m15",
		title: "Thor",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_.jpg",
		rating: 6.9,
		description:
			"Thor is a 2011 American superhero film based on the Marvel Comics character of the same name. Produced by Marvel Studios and distributed by Paramount Pictures, it is the fourth film in the Marvel Cinematic Universe (MCU).",
		producer: "Marvel Studios",
		director: "Taika Waititi & Alan Taylor & Kenneth Branagh",
		duration: 114,
		year: 2011,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m16",
		title: "Thor: The Dark World",
		imgUrl: "http://www.movienewsletters.net/photos/119359R1.jpg",
		rating: 6.8,
		description:
			"Thor sets out on a journey to defeat Malekith, the leader of the Dark Elves when he returns to Asgard to retrieve a dangerous weapon and fulfill his desire of destroying the Nine Realms.",
		producer: "Marvel Studios",
		director: "Alan Taylor",
		duration: 112,
		year: 2013,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m17",
		title: "Captain America: The First Avenger",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_FMjpg_UX1000_.jpg",
		rating: 6.9,
		description:
			"During World War II, Steve Rogers decides to volunteer in an experiment that transforms his weak body. He must now battle a secret Nazi organisation headed by Johann Schmidt to defend his nation.",
		producer: "Marvel Studios",
		director: "Joe Johnston",
		duration: 124,
		year: 2011,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	},
	{
		id: "m18",
		title: "Captain America: Civil War",
		imgUrl:
			"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_.jpg",
		rating: 7.8,
		description:
			"Friction arises between the Avengers when one group supports the government's decision to implement a law to control their powers while the other opposes it.",
		producer: "Marvel Studios",
		director: "Joe Russo & Anthony Russo",
		duration: 148,
		year: 2016,
		genreList: [ "Action & Adventures", "Science-Fiction & Fantasy" ],
		isFavorite: false,
		isFromStore: true
	}
];

export default DUMMY_MOVIES;
