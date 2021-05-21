import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./Login.css";
import db, { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
function Login() {
	const history = useHistory();
	const [state, dispatch] = useStateValue();

	const Logout = () => {
		window.parent.location = window.parent.location.href;
	};

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				// console.log(result);
				db.collection("Users")
					.where("email", "==", result.user.email)
					.get()
					.then((a) => {
						console.log("a : ", a);
						if (a.empty || a.exists == false) {
							alert("You are not Signed Up. Please Sign up first!");
							Logout();
						} else {
							dispatch({
								type: actionTypes.SET_USER,
								user: result.user,
							});
						}
					});
			})
			.catch((error) => {
				alert(error.message);
			});
		history.replace("/");
	};
	const signUp = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				db.collection("Users")
					.where("email", "==", result.user.email)
					.get()
					.then((a) => {
						if (a.empty == false || a.exists) {
							alert(
								"This email is already in use, please use some other email id."
							);
							Logout();
						} else {
							dispatch({
								type: actionTypes.SET_USER,
								user: result.user,
							});
						}
					});
			})
			.catch((error) => {
				alert(error.message);
			});
		history.push("/signup");
	};
	return (
		<div className="login">
			<div className="login-container">
				<img src={logo} alt="Logo" />
				<h1>Sign in to Smart Class</h1>
				<p>Making online classes a breeze.. </p>
				<button onClick={signIn}>Sign In</button>
				<button onClick={signUp}>Sign Up</button>
			</div>
		</div>
	);
}
export default Login;
