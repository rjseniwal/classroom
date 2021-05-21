import React, { useState, useEffect } from "react";
import Message from "./Message";
import "./Chat.css";
import Chatinput from "./Chatinput";
import db from "./firebase";

function Announcement({ isTeacher, tabName, classId }) {
	const [options, setOptions] = useState([]);
	useEffect(() => {
		db.collection("Classes")
			.doc(classId)
			.collection(tabName)
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setOptions(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						teacher_name: doc.data().user,
						text: doc.data().message,
						timestamp: doc.data().timestamp,
						img: doc.data().userimage,
					}))
				)
			);
		console.log(`${tabName} options: `, options);
	}, [tabName]);

	const input = () => {
		if (isTeacher) {
			return <Chatinput classId={classId} tabName={tabName} />;
		}
	};

	return (
		<div className="chat">
			<div className="chat-header">
				<strong># {tabName}</strong>
			</div>
			<div className="chat-messages">
				{options.map((option) => (
					<Message
						message={option.text}
						user={option.teacher_name}
						timestamp={option.timestamp}
						userImage={option.img}
					/>
				))}
			</div>
			<div className="chat-box-input">{input()}</div>
		</div>
	);
}

export default Announcement;
