import { Comment } from "../../models/Movie";

export function userAlreadyReviewed (comments: Comment[], userEmail: string) {
	return comments.some((c) => c.userEmail === userEmail);
}

export function verityIfUserUpVoted (upVotesList: string[], userEmail: string) {
	return upVotesList.some((email) => email === userEmail);
}

export function verityIfUserDownVoted (
	downVotesList: string[],
	userEmail: string
) {
	return downVotesList.some((email) => email === userEmail);
}

export const DUMMY_COMMENTS: Comment[] = [
	{
		id: "c1",
		movieId: "m1",
		userName: "Jonas Schmedtmann",
		userEmail: "JonasSchmedtmann@gmail.com",
		commentText: "The first comment ever",
		dateString: "April 17, 2021",
		rating: 8.2,
		upVotesList: [
			"StephenGrider@gmail.com",
			"JonasSchmedtmann@gmail.com",
			"Jonas@gmail.com"
		],
		downVotesList: [ "ColtSteele@gmail.com" ]
	},
	{
		id: "c2",
		movieId: "m1",
		userName: "Stephen Grider",
		userEmail: "StephenGrider@gmail.com",
		commentText: "The second comment. This movie is great.",
		dateString: "April 25, 2021",
		rating: 8.9,
		upVotesList: [ "StephenGrider@gmail.com", "Jonas@gmail.com" ],
		downVotesList: [ "ColtSteele@gmail.com", "Jonas@gmail.com" ]
	},
	{
		id: "c3",
		movieId: "m1",
		userName: "Jonas",
		userEmail: "Jonas@gmail.com",
		commentText: "The third comment. This is ...",
		dateString: "May 12, 2021",
		rating: 9,
		upVotesList: [],
		downVotesList: []
	},
	{
		id: "c4",
		movieId: "m1",
		userName: "Maximilian Schwarzmüller",
		userEmail: "MaximilianSchwarzmüller@gmail.com",
		commentText: "My first comment. I'm not a fan of this movie",
		dateString: "June 12, 2021",
		rating: 7,
		upVotesList: [],
		downVotesList: []
	},
	{
		id: "c5",
		movieId: "m1",
		userName: "Colt Steele",
		userEmail: "ColtSteele@gmail.com",
		commentText: "This is the worst movie MyMovies ever has to provide.",
		dateString: "November 30, 2021",
		rating: 3,
		upVotesList: [],
		downVotesList: []
	}
];
