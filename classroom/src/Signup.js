import React, { useState, useEffect } from "react";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

import "./Signup.css";
function Signup() {
	const [{ user }, dispatch] = useStateValue();
	const history = useHistory();

	const setisTeacher = (teacher) => {
		db.collection("Users").add({
			name: user.displayName,
			email: user.email,
			isTeacher: teacher,
		});
		history.replace("/");
	};

	return (
		<div className="signup">
			<div className="signup-container">
				<h1>I am a ...</h1>
				<div className="buttons">
					<button
						onClick={() => {
							setisTeacher(true);
						}}
					>
						Teacher
					</button>
					<button
						onClick={() => {
							setisTeacher(false);
						}}
					>
						Student
					</button>
				</div>
			</div>
		</div>
	);
}
export default Signup;
