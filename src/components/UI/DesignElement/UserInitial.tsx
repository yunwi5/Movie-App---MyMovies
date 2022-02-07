import { getUserInitial } from "../../../utilities/string-util";

const UserInitial: React.FC<{ userName: string }> = ({ userName }) => {
	let userInitial = "";
	if (userName) {
		userInitial = getUserInitial(userName);
	}

	return <div className="user-initial-icon icon">{userInitial}</div>;
};

export default UserInitial;
