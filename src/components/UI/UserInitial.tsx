import { getUserInitial } from "../../utilities/string-util";

interface Props {
	userName: string;
}

const UserInitial: React.FC<Props> = ({ userName }) => {
	let userInitial = "";
	if (userName) {
		userInitial = getUserInitial(userName);
	}

	return <div className="user-initial-icon icon">{userInitial}</div>;
};

export default UserInitial;
