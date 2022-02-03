// Only 1 admin at the moment
const adminEmailList: string[] = [ "yunwi5@gmail.com" ];

export function userIsAdmin (email: string | null) {
	return adminEmailList.includes(email || "");
}
