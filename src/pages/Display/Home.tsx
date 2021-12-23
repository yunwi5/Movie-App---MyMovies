import React, { useState } from "react";
import { getAllUsers } from "../../api/user-api";

const Home: React.FC = () => {
	const [ users, setUsers ] = useState<{}>([]);

	const uploadUsersHandler = async () => {
		const users = await getAllUsers();
		setUsers(users);
	};
	return (
		<main>
			<h2>Hi, Home</h2>
			<button className="btn-gen" onClick={uploadUsersHandler}>
				Get all users
			</button>
			<pre style={{ fontSize: "17px" }}>{JSON.stringify(users, null, 2)}</pre>
		</main>
	);
};

export default Home;
