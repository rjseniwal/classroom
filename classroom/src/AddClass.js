import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import DateTimePicker from "react-datetime-picker";
import "./AddClass.css";
import db from "./firebase";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function AddClass() {
	const [classChosen, setClassChosen] = useState(false);
	const [isExtra, setIsExtra] = useState(false);
	const [classStartTime, setStartTime] = useState(new Date());
	const [classEndTime, setEndTime] = useState(new Date());
	const [classTitle, setTitle] = useState("");
	const history = useHistory();
	const [{ user }, dispatch] = useStateValue();
	const [sub, setSub] = useState();

	const { classId } = useParams();

	useEffect(() => {
		db.collection("Classes")
			.doc(classId)
			.get()
			.then((doc) => setSub(doc.data().name));
	}, []);

	const addToDb = (title, start, end) => {
		db.collection("Classes").doc(classId).collection("Events").add({
			title: title,
			startTimeStamp: start,
			endTimeStamp: end,
		});
	};

	const sendEmail = (to_name, class_time, to_email) => {
		console.log("sending mail");
		var meet_link = `https://secret-basin-10339.herokuapp.com/${classId}`;
		var templateParams = {
			subject_name: sub,
			to_name: to_name,
			class_time: class_time,
			meet_link: meet_link,
			sender: user.displayName,
			to_email: to_email,
		};
		emailjs
			.send(
				"service_w83golk",
				"template_vp47lcu",
				templateParams,
				"user_NnE9g9gPPoWFkuiVBgjBq"
			)
			.then((response) => {
				console.log("SUCCESS");
			})
			.catch((error) => {
				console.log("ERROR : ", error);
			});
	};

	const addNewClass = () => {
		// e.preventDefault();

		addToDb(classTitle, classStartTime, classEndTime);

		if (isExtra == false) {
			var i = 0;
			var newStart = new Date(classStartTime);
			var newEnd = new Date(classEndTime);
			for (i = 0; i < 27; i++) {
				newStart.setDate(newStart.getDate() + 7);
				newEnd.setDate(newEnd.getDate() + 7);
				// console.log(newStart);
				addToDb(classTitle, newStart, newEnd);
			}
			// console.log(newStart);
		} else {
			db.collection("Classes")
				.doc(classId)
				.collection("Students")
				.onSnapshot((snapshot) => {
					snapshot.forEach((student) => {
						console.log(student.id);
						sendEmail(
							student.data().name,
							classStartTime,
							student.data().studentId
						);
					});
				});
		}
		alert("Your new class has been added");
		history.replace(`/class/${classId}`);
	};

	return (
		<div className="addclass">
			<div className="addclass-container">
				<div>
					<div className="button-container">
						<button
							onClick={() => {
								setClassChosen(true);
								setIsExtra(false);
							}}
						>
							Regular Class
						</button>
						<button
							onClick={() => {
								setClassChosen(true);
								setIsExtra(true);
							}}
						>
							Extra Class
						</button>
					</div>
				</div>
				{classChosen ? (
					<div className="add-class-inputs">
						<div className="add-class-labels">
							<label>Class Name:</label>
							<label>Class Start Time:</label>
							<label>Class End Time:</label>
						</div>
						<div className="add-class-values">
							<input
								className="add-class-input"
								type="text"
								value={classTitle}
								onChange={(e) => setTitle(e.target.value)}
							></input>
							<DateTimePicker
								// className="add-class-input"
								onChange={setStartTime}
								value={classStartTime}
							/>
							<DateTimePicker
								// className="add-class-input"
								onChange={setEndTime}
								value={classEndTime}
							/>
						</div>
						<button onClick={addNewClass} type="submit">
							Submit
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default AddClass;
