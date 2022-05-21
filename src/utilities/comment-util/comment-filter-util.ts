import { Comment } from '../../models/Movie';

export enum RatingFilter {
    ALL = 'All ratings',
    EIGHT_TO_TEN = '8 to 10',
    SIX_TO_EIGHT = '6 to 8',
    FOUR_TO_SIX = '4 to 6',
    TWO_TO_FOUR = '2 to 4',
    ZERO_TO_TWO = '0 to 2',
}

export function filterReviewsBySearch(comments: Comment[], filter: string) {
    const filteredComments = comments.filter((c) =>
        c.userName.toLowerCase().includes(filter.toLowerCase()),
    );
    return filteredComments;
}

export function filterReviewsByRating(comments: Comment[], filter: string) {
    switch (filter) {
        case '':
            return comments;
        case RatingFilter.ALL:
            return comments;
        case RatingFilter.EIGHT_TO_TEN:
            return comments.filter((c) => c.rating >= 8);
        case RatingFilter.SIX_TO_EIGHT:
            return comments.filter((c) => c.rating >= 6 && c.rating < 8);
        case RatingFilter.FOUR_TO_SIX:
            return comments.filter((c) => c.rating >= 4 && c.rating < 6);
        case RatingFilter.TWO_TO_FOUR:
            return comments.filter((c) => c.rating >= 2 && c.rating < 4);
        case RatingFilter.ZERO_TO_TWO:
            return comments.filter((c) => c.rating < 2);
        default:
            console.log('Comments not filtered? Then, check the filter keyword!');
    }
}

export function filterReviews(comments: Comment[], ratingFilter: string, searchFilter: string) {
    const ratingFiltered = filterReviewsByRating(comments, ratingFilter);
    if (!ratingFiltered || ratingFiltered.length === 0) return [];
    const reFiltered = filterReviewsBySearch(ratingFiltered, searchFilter);
    return reFiltered;
}
