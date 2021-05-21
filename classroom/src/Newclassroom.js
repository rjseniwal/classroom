import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Newclassroom.css";

function Newclassroom() {
	const [input, setInput] = useState();
	const history = useHistory();
	const [{ user }, dispatch] = useStateValue();

	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("Classes")
			.add({
				name: input,
				teacher: user.displayName,
			})
			.then((doc) => {
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
									classId: doc.id,
								});
						});
					});
				alert(`Your new class has been created with classs id: ${doc.id}`);
				history.replace(`/class/${doc.id}`);
			});

		setInput("");
		// history.replace("/");
	};
	return (
		<div className="newclassroom">
			<div className="newclassroom-container">
				<h2>Create a new Classroom</h2>
				<form>
					<input
						className="newclassroom-input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter Subject Name"
					/>
					<button
						className="newclassroom-button"
						onClick={sendMessage}
						type="submit"
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

export default Newclassroom;
