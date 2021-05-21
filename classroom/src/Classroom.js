import React, { useState, useEffect } from "react";
import Header from "./Header";
// import Chat from "./Chat";
import Announcement from "./Announcement";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VideocamIcon from "@material-ui/icons/Videocam";
import db from "./firebase";
import "./Classroom.css";
import { useParams, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Classroom() {
	const [option, setOption] = useState("Announcements");
	const history = useHistory();
	const [isTeacher, setIsTeacher] = useState(false);
	const [{ user }, dispatch] = useStateValue();

	var input = () => {
		if (isTeacher) {
			return (
				<button
					className="time-table"
					onClick={() => {
						history.push(`/addclass/${classId}`);
					}}
				>
					<AddBoxIcon /> <div className="time-table-text">Add a new class</div>
				</button>
			);
		} else return null;
	};

	var options = () => {
		console.log("running options");
		return (
			<Announcement isTeacher={isTeacher} tabName={option} classId={classId} />
		);
	};

	const { classId } = useParams();
	const [class_name, setClass_name] = useState("");
	const classSub = "Subject Name";
	useEffect(() => {
		db.collection("Classes")
			.doc(classId)
			.get()
			.then((doc) => setClass_name(doc.data().name))
			.catch((error) => {
				console.log(error);
			});
		db.collection("Users")
			.where("email", "==", user.email)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => setIsTeacher(doc.data().isTeacher));
			});
	}, []);

	return (
		<div className="classroom-container">
			<div className="classroom-badge">
				<h1>{class_name ? class_name : classSub}</h1>
				<h2>Batch 21</h2>
				<p>Class ID : {classId}</p>
				<div className="classroom-badge-buttons">
					<button
						className="time-table"
						onClick={() => {
							window.parent.location = `https://secret-basin-10339.herokuapp.com/${classId}`;
						}}
					>
						<VideocamIcon /> <div className="time-table-text">Join Class</div>
					</button>
					{input()}
				</div>
			</div>
			<div className="classroom-details">
				<div className="chat-box">
					<Announcement isTeacher={true} tabName="Chats" classId={classId} />
				</div>
				<div className="classroom-options">
					<div className="classroom-options-buttons">
						<button
							onClick={() => {
								setOption("Materials");
							}}
						>
							<strong>Material</strong>
						</button>
						<button
							onClick={() => {
								setOption("Announcements");
							}}
						>
							<strong>Announcements</strong>
						</button>
						<button
							onClick={() => {
								setOption("Quizzes");
							}}
						>
							<strong>Quizzes</strong>
						</button>
					</div>
					<div>
						{/* {options} */}
						{option == "Announcements" ? (
							<Announcement
								isTeacher={isTeacher}
								tabName="Announcements"
								classId={classId}
							/>
						) : option == "Materials" ? (
							<Announcement
								isTeacher={isTeacher}
								tabName="Materials"
								classId={classId}
							/>
						) : (
							<Announcement
								isTeacher={isTeacher}
								tabName="Quizzes"
								classId={classId}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Classroom;
