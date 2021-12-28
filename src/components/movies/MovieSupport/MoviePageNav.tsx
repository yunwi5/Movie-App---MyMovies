interface PageProps {
	currentPage: number;
	totalPages: number;
	onPrev: () => void;
	onNext: () => void;
}

const MoviePageNav: React.FC<PageProps> = (props) => {
	const { currentPage, totalPages, onPrev, onNext } = props;

	return (
		<section className="page-nav">
			<div
				className={`page-nav__icon-wrap ${currentPage === 1
					? "page-nav__icon-wrap--invalid"
					: ""}`}
				onClick={onPrev}
			>
				<i className="fa fa-angle-left" />
			</div>
			<p className="page-numbers">
				<strong>{currentPage}</strong> &ndash; {totalPages}
			</p>
			<div
				className={`page-nav__icon-wrap ${currentPage === totalPages
					? "page-nav__icon-wrap--invalid"
					: ""}`}
				onClick={onNext}
			>
				<i className="fa fa-angle-right" />
			</div>
		</section>
	);
};

export default MoviePageNav;
