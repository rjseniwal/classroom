import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
const localizer = momentLocalizer(moment);

function CalendarComponent(props) {
	let date = new Date();
	// add a day
	date.setDate(date.getDate() + 1);
	const [{ user }, dispatch] = useStateValue();
	const [myEventsList, setmyEventsList] = useState([]);
	useEffect(() => {
		var eventsList = [];
		db.collection("Users")
			.where("email", "==", user.email)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doca) => {
					console.log(doca.id);
					db.collection("Users")
						.doc(doca.id)
						.collection("ClassesEnrolled")
						.onSnapshot((snap) => {
							snap.forEach((docb) => {
								console.log("classId : ", docb.data().classId);
								db.collection("Classes")
									.doc(docb.data().classId)
									.collection("Events")
									.onSnapshot((ss) => {
										ss.forEach((ssi) => {
											setmyEventsList((myEventsList) => [
												...myEventsList,
												{
													title: ssi.data().title,
													start: ssi.data().startTimeStamp.toDate(),
													end: ssi.data().endTimeStamp.toDate(),
												},
											]);
											////////////////////
											// eventsList.push({
											// 	title: ssi.data().title,
											// 	start: ssi.data().startTimeStamp.toDate(),
											// 	end: ssi.data().endTimeStamp.toDate(),
											// });
										});
									});
							});
						});
				});
			});
		// setmyEventsList(eventsList);
	}, []);

	useEffect(() => {
		console.log(myEventsList);
	});
	return (
		<Calendar
			localizer={localizer}
			events={myEventsList}
			startAccessor="start"
			endAccessor="end"
			defaultView="week"
			views={["week", "day", "agenda"]}
		/>
	);
}
export default CalendarComponent;
