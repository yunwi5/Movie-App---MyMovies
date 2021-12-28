export const validateUserName = (inputName: string | null) => {
	if (!inputName) {
		return { valid: false, message: "You need to enter your username!" };
	}
	if (!/\w/.test(inputName)) {
		return {
			valid: false,
			message: "Your username should contain alphabets!"
		};
	}
	if (inputName.length < 3) {
		return {
			valid: false,
			message: "Your username should be at least 3 characters long!"
		};
	}

	return { valid: true, message: null };
};

export const validateEmail = (inputEmail: string | null) => {
	if (!inputEmail) {
		return { valid: false, message: "You need to enter your email!" };
	}
	if (!inputEmail.includes("@")) {
		return { valid: false, message: "Your email should include @" };
	}
	if (!/\w/.test(inputEmail)) {
		return {
			valid: false,
			message: "Your email should contain alphabets!"
		};
	}
	if (inputEmail.length < 5) {
		return {
			valid: false,
			message: "Your email should be longer!"
		};
	}
	if (
		!inputEmail.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		return { valid: false, message: "Your email is invalid." };
	}

	return { valid: true, message: null };
};

export const validatePassword = (inputPass: string | null) => {
	if (!inputPass) {
		return { valid: false, message: "You need to enter your password!" };
	}
	if (inputPass.length < 5) {
		return { valid: false, message: "Your password (at least 5 characters) is too short!" };
	}

	return { valid: true, message: null };
};
