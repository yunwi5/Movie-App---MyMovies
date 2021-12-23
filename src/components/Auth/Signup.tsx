import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_KEY, validateUserName, validateEmail, validatePassword } from "../../utilities/auth-util";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthModal from "../UI/Modal/AuthModal";
import { addUser } from "../../api/user-api";

const Signup: React.FC = () => {
	const navigate = useNavigate();
	// Loading Spinner
	const [ isLoading, setIsLoading ] = useState(false);
	// Modal
	const [ showModal, setShowModal ] = useState(false);
	const [ modalContent, setModalContent ] = useState({ heading: "", messages: [ "" ], onClose: () => {} });

	const userNameRef = useRef<HTMLInputElement>(null);
	const [ userNameState, setUserNameState ] = useState<{ valid: boolean; userNameMessage: string | null }>({
		valid: true,
		userNameMessage: null
	});

	const emailRef = useRef<HTMLInputElement>(null);
	const [ emailState, setEmailState ] = useState<{ valid: boolean; emailMessage: string | null }>({
		valid: true,
		emailMessage: null
	});

	const passwordRef = useRef<HTMLInputElement>(null);
	const [ passwordState, setPasswordState ] = useState<{ valid: boolean; passwordMessage: string | null }>({
		valid: true,
		passwordMessage: null
	});

	const validateUserInput = () => {
		const enteredName = userNameRef.current!.value;
		const { valid: userNameIsValid, message: userNameMes } = validateUserName(enteredName);

		const enteredEmail = emailRef.current!.value;
		const { valid: emailIsValid, message: emailMes } = validateEmail(enteredEmail);

		const enteredPassword = passwordRef.current!.value;
		const { valid: passIsValid, message: passMes } = validatePassword(enteredPassword);

		if (!userNameIsValid) {
			setUserNameState({ valid: false, userNameMessage: userNameMes });
		} else {
			setUserNameState({ valid: true, userNameMessage: null });
		}
		if (!emailIsValid) {
			setEmailState({ valid: false, emailMessage: emailMes });
		} else {
			setEmailState({ valid: true, emailMessage: null });
		}
		if (!passIsValid) {
			setPasswordState({ valid: false, passwordMessage: passMes });
		} else {
			setPasswordState({ valid: true, passwordMessage: null });
		}
		return userNameIsValid && emailIsValid && passIsValid;
	};

	const configureModal = (isSuccess: boolean, reqMessage: string | null) => {
		if (isSuccess) {
			setModalContent({
				heading: "Sign Up Successful!",
				messages: [ "You are not the member of MyMovies!", "Please login and enjoy the service!" ],
				onClose: () => {
					navigate("/auth/login");
					setShowModal(false);
				}
			});
			setShowModal(true);
			// Add user to DB with username attached. Currently, this part is undone.
			addUser(userNameRef.current!.value, emailRef.current!.value);
		} else {
			setModalContent({
				heading: "Sign Up Unsuccessful...",
				messages: [ "You sign up went wrong. Please try again", reqMessage || "" ],
				onClose: () => {
					setShowModal(false);
				}
			});
			setShowModal(true);
		}
	};

	const submitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		const formIsValid = validateUserInput();
		if (!formIsValid) return;

		const enteredName = userNameRef.current!.value;
		const enteredEmail = emailRef.current!.value;
		const enteredPassword = passwordRef.current!.value;
		// Form is valid, so send HTTP Request.
		setIsLoading(true);
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
				{
					method: "POST",
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			setIsLoading(false);
			if (response.ok) {
				console.log("response OK!");
				// Send some success message using Modal
				configureModal(true, null);
			} else {
				const data = await response.json();
				let errMessage = "Something went wrong in Sign Up...";
				if (data && data.error && data.error.message) {
					errMessage = data.error.message;
				}
				// Send some unsuccessful message using Modal
				configureModal(false, errMessage);
			}
		} catch (e) {
			console.log("Error occured in signup");
			console.error(e);
		}
	};

	const formIsInvalid =
		userNameState.userNameMessage || emailState.emailMessage || passwordState.passwordMessage;

	return (
		<form
			className={`auth-form ${formIsInvalid ? "auth-form--invalid signup-form--invalid" : ""}`}
			onSubmit={submitHandler}
		>
			<h2>Sign Up and Start Collection!</h2>

			<div className={`username-wrapper wrapper ${userNameState.valid ? "" : "wrapper--invalid"}`}>
				<label htmlFor="username-input">
					<i className="fa fa-user" />
				</label>
				<input
					type="text"
					placeholder="Username"
					id="username-input"
					name="username-input"
					ref={userNameRef}
				/>
			</div>
			{!userNameState.valid && <p className="error-message">{userNameState.userNameMessage}</p>}

			<div className={`email-wrapper wrapper ${emailState.valid ? "" : "wrapper--invalid"}`}>
				<label htmlFor="email-input">
					<i className="fa fa-envelope" />
				</label>
				<input type="email" placeholder="Email" id="email-input" name="email-input" ref={emailRef} />
			</div>
			{!emailState.valid && <p className="error-message">{emailState.emailMessage}</p>}

			<div className={`password-wrapper wrapper ${passwordState.valid ? "" : "wrapper--invalid"}`}>
				<label htmlFor="password-input">
					<i className="fa fa-lock" />
				</label>
				<input
					type="password"
					placeholder="Password"
					id="password-input"
					name="password-input"
					ref={passwordRef}
				/>
			</div>
			{!passwordState.valid && <p className="error-message">{passwordState.passwordMessage}</p>}

			{!isLoading && <button>Sign Up</button>}
			{isLoading && <LoadingSpinner />}

			<p className="auth-bottom">
				Already have an account?{" "}
				<NavLink to="/auth/login" className="auth-link">
					Log In
				</NavLink>
			</p>

			{showModal && <AuthModal modalContent={modalContent} />}
		</form>
	);
};

export default Signup;
