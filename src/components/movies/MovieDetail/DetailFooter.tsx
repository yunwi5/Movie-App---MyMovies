import React from "react";

interface Props {
	genreList: string[];
	onClick: (name: string) => void;
}

const DetailFooter: React.FC<Props> = (props) => {
	const { genreList, onClick } = props;

	return (
		<div className="movie-detail__genres">
			<ul>
				{genreList.map((genre, idx) => (
					<li onClick={onClick.bind(null, genre)} key={idx}>
						{genre}
					</li>
				))}
			</ul>
		</div>
	);
};

export default DetailFooter;
