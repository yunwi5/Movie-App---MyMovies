// Shuffle Movies List Randomly
export function shuffleList<T> (initialList: T[]) {
	const copyList = [ ...initialList ];
	const listLength = copyList.length;
	let currentIndex = copyList.length - 1;

	while (currentIndex >= 0) {
		// Create random index between index 0 and moviesLength - 1
		let randomIndex = Math.floor(Math.random() * listLength);
		[ copyList[currentIndex], copyList[randomIndex] ] = [
			copyList[randomIndex],
			copyList[currentIndex]
		];
		currentIndex--;
	}

	return copyList;
}

export function objectToArray<T> (obj: Object | Array<T>) {
	if (Array.isArray(obj)) return obj;

	const resultArray: T[] = [];
	Object.entries(obj).forEach(([ key, value ]) => {
		resultArray.push({ ...value, key });
	});

	return resultArray;
}
