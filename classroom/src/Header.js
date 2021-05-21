import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

import "./Header.css";
function Header() {
	const [{ user }] = useStateValue();
	const history = useHistory();

	const Logout = () => {
		window.parent.location = window.parent.location.href;
	};

	return (
		<div className="header">
			<div
				onClick={() => {
					history.replace("/");
				}}
				className="header-left"
			>
				<HomeIcon />
				Smart Class
			</div>
			<div className="header-right">
				<div className="display-name">
					{user?.displayName}
					<button
						onClick={Logout}
						className="display-name-button"
						type="submit"
					>
						Log out
					</button>
				</div>
				<div className="display-avatar">
					<Avatar alt={user?.displayName} src={user?.photoURL} />
				</div>
			</div>
		</div>
	);
}
export default Header;
