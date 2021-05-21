import React, { useState, useEffect } from "react";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useHistory } from "react-router-dom";

import "./Classbox.css";
function Classbox({ subject_name, teacher_name, classId }) {
	const history = useHistory();
	const sub = "Subject_name";
	return (
		<button
			onClick={() => history.push(`/class/${classId}`)}
			className="classbox-container"
			type="submit"
		>
			<div className="classbox-body">
				<div className="classbox-body-left">
					<p>
						{subject_name ? subject_name : sub} <br />
						{teacher_name ? teacher_name : "teacher_name"} <br />
						Batch 21
					</p>
				</div>
				<div className="classbox-body-right">
					<LibraryBooksIcon />
				</div>
			</div>
		</button>
	);
}
export default Classbox;
