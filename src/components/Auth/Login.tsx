import React, { useRef, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_KEY, validateEmail, validatePassword } from "../../utilities/auth-util";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthModal from "../UI/Modal/AuthModal";

const Login: React.FC = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [ isLoading, setIsLoading ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ modalContent, setModalContent ] = useState({ heading: "", messages: [ "" ], onClose: () => {} });

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
		const enteredEmail = emailRef.current!.value;
		const { valid: emailIsValid, message: emailMes } = validateEmail(enteredEmail);

		const enteredPassword = passwordRef.current!.value;
		const { valid: passIsValid, message: passMes } = validatePassword(enteredPassword);

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
		console.log(emailIsValid, passIsValid);
		return emailIsValid && passIsValid;
	};

	const configureModal = (isSuccess: boolean, reqMessage: string | null) => {
		if (isSuccess) {
			setModalContent({
				heading: "Login Successful!",
				messages: [ "You can see the overview of the service in About page.", "Hope you enjoy!" ],
				onClose: () => {
					navigate("/movies");
					setShowModal(false);
				}
			});
			setShowModal(true);
		} else {
			setModalContent({
				heading: "Login Unsuccessful...",
				messages: [ "Something went wrong in your login process", reqMessage || "" ],
				onClose: () => {
					setShowModal(false);
				}
			});
			setShowModal(true);
		}
	};

	const submitHandler = async (event: React.FormEvent) => {
		console.log("Submitted");
		event.preventDefault();
		const formIsValid = validateUserInput();
		if (!formIsValid) return;

		const enteredEmail = emailRef.current!.value;
		const enteredPassword = passwordRef.current!.value;

		setIsLoading(true);

		try {
			const res = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true
					})
				}
			);

			const data = await res.json();
			setIsLoading(false);
			if (res.ok) {
				const idToken = data.idToken;
				authCtx.login(idToken, enteredEmail);
				configureModal(true, null);
			} else {
				const errMessage = data.error.message;
				configureModal(false, errMessage);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const formIsInvalid = emailState.emailMessage || passwordState.passwordMessage;
	console.log("login form is invalid", formIsInvalid);

	return (
		<form className={`auth-form ${formIsInvalid ? "auth-form--invalid" : ""}`} onSubmit={submitHandler}>
			<h2>Login And Enjoy!</h2>

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

			{!isLoading && <button>Log In</button>}
			{isLoading && <LoadingSpinner />}

			<p className="auth-bottom">
				Don't have an account?{" "}
				<NavLink to="/auth/signup" className="auth-link">
					Sign Up
				</NavLink>
			</p>

			{showModal && <AuthModal modalContent={modalContent} />}
		</form>
	);
};

export default Login;
