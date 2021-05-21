import React, { useState, useEffect } from "react";
import Message from "./Message";
import "./Chat.css";
import Chatinput from "./Chatinput";
import db from "./firebase";

function Chat({ classId }) {
	const [options, setOptions] = useState([]);
	useEffect(() => {
		db.collection("Classes")
			.doc(classId)
			.collection("Announcements")
			.onSnapshot((snapshot) =>
				setOptions(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						teacher_name: doc.data().name,
						text: doc.data().text,
					}))
				)
			);
	}, []);
	return (
		<div className="chat">
			<div className="chat-header">
				<strong># Chat</strong>
			</div>
			<div className="chat-list">
				<div className="chat-list-messages"></div>
				<div className="chat-list-input">
					<Chatinput />
				</div>
			</div>
		</div>
	);
}

export default Chat;
