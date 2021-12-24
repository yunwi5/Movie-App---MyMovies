import React, { useState } from "react";
import { getAllUsers, getUserById } from "../../api/user-api";

const Testing: React.FC = () => {
	const [ users, setUsers ] = useState<{}>([]);

	const uploadUsersHandler = async () => {
		const users = await getUserById("-Mrb2tNZ0KYySwNUKqz8");
		setUsers([ users ]);
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

export default Testing;
