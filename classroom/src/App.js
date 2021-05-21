import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AddClass from "./AddClass";
import CalendarComponent from "./CalendarComponent";
import Login from "./Login";
import Signup from "./Signup";
import Classlist from "./Classlist";
import Classroom from "./Classroom";
import Chat from "./Chat";
import Announcement from "./Announcement";
import { useStateValue } from "./StateProvider";
import Header from "./Header";
import Newclassroom from "./Newclassroom";
import Joinclassroom from "./Joinclassroom";


function App() {
	const [{ user }, dispatch] = useStateValue();

	return (
		<BrowserRouter>
			{!user ? (
				<Login />
			) : (
				<div className='main'>
					<Header />
					<Switch>
						{/* <Route path="/" exact component={Classlist} />
						<Route path="/classlist" exact component={Classlist} />
						<Route path="/classroom" exact component={Classroom} />
						<Route path="/chat" exact component={Chat} />
						<Route path="/announcement" exact component={Announcement} />
						<Route path="/addclass" exact component={AddClass} />
						<Route path="/calendar" exact component={CalendarComponent} />
						<Route path="/signup" exact component={Signup} /> */}
						<Route path="/" exact>
							<Classlist />
						</Route>
						<Route path="/signup" exact>
							<Signup />
						</Route>
						<Route path="/calendar">
							<CalendarComponent />
						</Route>
						<Route path="/newclassroom">
							<Newclassroom />
						</Route>
						<Route path="/joinclassroom">
							<Joinclassroom />
						</Route>
						<Route path="/addclass/:classId">
							<AddClass />
						</Route>
						<Route path="/class/:classId">
							<Classroom />
						</Route>
					</Switch>
				</div>
			)}
		</BrowserRouter>
	);
}

export default App;
