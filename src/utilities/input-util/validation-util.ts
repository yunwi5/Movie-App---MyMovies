export function validateRating (rating: number) {
	let userMessage = "valid";
	let isValid = true;
	if (!rating) {
		userMessage = "You need to enter your rating!";
		isValid = false;
	} else if (rating < 0 || rating > 10) {
		userMessage = "Your rating should be between 0 and 10!";
		isValid = false;
	}

	return {
		ratingUserMessage: userMessage,
		ratingIsValid: isValid
	};
}

export function validateComment (text: string) {
	let userMessage = "valid";
	let isValid = true;
	if (!text) {
		userMessage = "You need to enter your comment!";
		isValid = false;
	} else if (text.length < 5) {
		userMessage = "Your comment is too short!";
		isValid = false;
	}

	return {
		commentUserMessage: userMessage,
		commentIsValid: isValid
	};
}
