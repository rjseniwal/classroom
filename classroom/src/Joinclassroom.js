import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Joinclassroom.css";

function Joinclassroom() {
	const [input, setInput] = useState();
	const history = useHistory();
	const [{ user }, dispatch] = useStateValue();

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection("Classes")
			.doc(input)
			.get()
			.then((item) => {
				console.log("item : ", item);
				if (item.exists || item.empty == false) {
					db.collection("Classes").doc(input).collection("Students").add({
						name: user.displayName,
						studentId: user.email,
					});
					db.collection("Users")
						.where("email", "==", user.email)
						.get()
						.then((snapshot) => {
							snapshot.forEach((doca) => {
								db.collection("Users")
									.doc(doca.id)
									.collection("ClassesEnrolled")
									.add({
										name: "",
										classId: input,
									});
							});
						});
				} else {
					alert("Invalid Class ID");
				}
			});
		history.replace(`/class/${input}`);
	};
	return (
		<div className="joinclassroom">
			<div className="joinclassroom-container">
				<h2>Join a new Classroom</h2>
				<form>
					<input
						className="joinclassroom-input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter class id"
					/>
					<button
						className="joinclassroom-button"
						onClick={sendMessage}
						type="submit"
					>
						Join
					</button>
				</form>
			</div>
		</div>
	);
}

export default Joinclassroom;
