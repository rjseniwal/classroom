import React, { useState } from "react";
import "./Chatinput.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chatinput({ classId, tabName }) {
	const [input, setInput] = useState("");
	const [{ user }] = useStateValue();

	const sendMessage = (e) => {
		e.preventDefault();

		if (classId) {
			db.collection("Classes").doc(classId).collection(tabName).add({
				message: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user.displayName,
				userimage: user.photoURL,
			});
		}
		setInput("");
	};

	return (
		<div className="chat-input">
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your Message"
				/>
				<button onClick={sendMessage} type="submit">
					SEND
				</button>
			</form>
		</div>
	);
}

export default Chatinput;
