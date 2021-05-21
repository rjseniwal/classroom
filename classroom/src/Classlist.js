import React, { useState, useEffect } from "react";
import Classbox from "./Classbox";
import { useHistory } from "react-router-dom";
import EventNoteIcon from "@material-ui/icons/EventNote";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useStateValue } from "./StateProvider";

import "./Classlist.css";
import db from "./firebase";

function Classlist() {
	const history = useHistory();
	const [classes, setClasses] = useState([]);
	const [{ user }, dispatch] = useStateValue();
	const [isTeacher, setIsTeacher] = useState();
	useEffect(() => {
		db.collection("Users")
			.where("email", "==", user.email)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doca) => {
					console.log(doca.data().name);
					db.collection("Users")
						.doc(doca.id)
						.collection("ClassesEnrolled")
						.onSnapshot((snap) => {
							snap.forEach((docb) => {
								db.collection("Classes")
									.doc(docb.data().classId)
									.get()
									.then((ss) => {
										setClasses((classes) => [
											...classes,
											{
												id: ss.id,
												subject_name: ss.data().name,
												teacher_name: ss.data().teacher,
											},
										]);
										console.log("ss : ", ss.id);
									});
								console.log(docb.data().classId);
							});
						});
					setIsTeacher(doca.data().isTeacher);
				});
			});

		// db.collection("Classes").onSnapshot((snapshot) =>
		// 	setClasses(
		// 		snapshot.docs.map((doc) => ({
		// 			id: doc.id,
		// 			subject_name: doc.data().name,
		// 			teacher_name: doc.data().teacher,
		// 		}))
		// 	)
		// );
		// db.collection("Users")
		// 	.where("email", "==", user.email)
		// 	.get()
		// 	.then((snapshot) => {
		// 		snapshot.forEach((doc) => setIsTeacher(doc.data().isTeacher));
		// 	});
	}, []);
	useEffect(() => {
		console.log(classes);
	}, [classes]);
	return (
		<div className="classroom-container">
			<div className="classroom-body">
				<div className="classroom-body-buttons">
					<button
						className="time-table"
						onClick={() => {
							history.push("/calendar");
						}}
					>
						<EventNoteIcon /> <div className="time-table-text">Time Table</div>
					</button>
					<button
						className="time-table"
						onClick={() => {
							if (isTeacher) {
								history.push("/newclassroom");
							} else {
								history.push("/joinclassroom");
							}
							setClasses([]);
						}}
					>
						<MeetingRoomIcon />{" "}
						<div className="time-table-text">
							{isTeacher ? "Create" : "Join"} a New Classroom
						</div>
					</button>
				</div>
				<div className="classroom-box-body">
					{classes.map((option) => (
						<Classbox
							subject_name={option.subject_name}
							teacher_name={option.teacher_name}
							classId={option.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
export default Classlist;
