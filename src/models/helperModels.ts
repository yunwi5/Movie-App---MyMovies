import { Genre } from './Movie';

export enum SortingStandard {
	RATING = 'rating',
	TITLE = 'title',
	YEAR = 'year',
}

export enum Direction {
	ASCENDING = 'ASC',
	DESCENDING = 'DES',
}

export enum Status {
	INITIAL = 'initial',
	LOADING = 'loading',
	ERROR = 'error',
	SUCCESS = 'success',
}

// Web scraping for movies
// This includes raw data from the server which is not processed perfectly.
// Then, the next one is ProcessedMovie which is the processed version for user input.
export interface ScrapedMovie {
	title: string;
	description: string;
	year: number | null;
	hours: number | null;
	minutes: number | null;
	genres: string;
	director: string | null;
	producers: string[] | null;
	rating: number | null;
}

export interface ProcessedMovie {
	title: string;
	description: string;
	year: number;
	hours: number;
	minutes: number;
	genres: Genre[];
	director: string;
	producers: string[];
	rating: number;
}
