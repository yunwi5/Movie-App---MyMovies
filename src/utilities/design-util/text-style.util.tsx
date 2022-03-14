export function getSearchPartHighlighted (movieTitle: string, searchText: string): JSX.Element {
	const pos = movieTitle.toLowerCase().indexOf(searchText.trim().toLowerCase());
	if (pos < 0) return <span className="highlight-text">movieTitle</span>;

	const length = searchText.trim().length;

	const firstPart = movieTitle.substring(0, pos);
	const highlightPart = movieTitle.substring(pos, pos + length);
	const lastPart = movieTitle.substring(pos + length);

	return (
		<span className="highlight-text">
			{firstPart}
			<strong>{highlightPart}</strong>
			{lastPart}
		</span>
	);
}
