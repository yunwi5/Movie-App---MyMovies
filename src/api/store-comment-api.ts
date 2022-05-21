import { Comment } from '../models/Movie';
import { objectToArray } from '../utilities/list-util';
import { FIREBASE_DOMAIN, STORE_MOVIES_KEY } from './constants';

// POST Request
export async function addCommentToMovie(movieId: string, comment: Comment) {
    try {
        const postUrl = `${FIREBASE_DOMAIN}/movies/${STORE_MOVIES_KEY}/${movieId}/comments.json`;
        const res = await fetch(postUrl, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data: any = await res.json();
        let newCommentKey = null;

        if (res.ok) {
            console.log('Post movie successful!');
            newCommentKey = data.name;
        } else {
            console.log('Post movie not successful.');
            throw new Error(data.message || "Your post didn't work");
        }

        return newCommentKey;
    } catch (err) {
        console.error((err as any).message);
    }
}

// GET Request
export async function getAllMovieComments(movieId: string) {
    try {
        const getUrl = `${FIREBASE_DOMAIN}/movies/${STORE_MOVIES_KEY}/${movieId}/comments.json`;
        const res = await fetch(getUrl);
        const data = await res.json();

        let commentsArray: Comment[] = [];

        if (res.ok) {
            // Convert to array, only if there are some initial comments object.
            if (data) {
                commentsArray = objectToArray(data);
            }
        } else {
            throw new Error(data.message || 'Get comments did not work.');
        }

        return commentsArray;
    } catch (err) {
        console.error((err as any).message);
    }
}

// PUT Request
export async function editMovieComment(movieId: string, comment: Comment) {
    const commentKey = comment.key;
    try {
        if (!commentKey) throw new Error('This comment does not even have key!');

        const putUrl = `${FIREBASE_DOMAIN}/movies/${STORE_MOVIES_KEY}/${movieId}/comments/${commentKey}.json`;
        const res = await fetch(putUrl, {
            method: 'PUT',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (res.ok) {
            console.log('PUT editted movie successful!');
        } else {
            throw new Error(data.message || 'Put new comment did not work!');
        }
    } catch (err) {
        console.error((err as any).message);
    }
}

// DELETE Request
export async function deleteMovieComment(movieId: string, commentKey: string) {
    try {
        const deleteUrl = `${FIREBASE_DOMAIN}/movies/${STORE_MOVIES_KEY}/${movieId}/comments/${commentKey}.json`;
        const res = await fetch(deleteUrl, {
            method: 'DELETE',
        });
        const data = await res.json();

        if (res.ok) {
            console.log('Delete comment successful!');
        } else {
            throw new Error(data.message || 'Delete comment went wrong...');
        }
    } catch (err) {
        console.error((err as any).message || 'Delete comment has error!');
    }
}
