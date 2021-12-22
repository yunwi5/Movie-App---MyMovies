import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<main className="not-found-content">
			<h2>Page Not Found</h2>
			<p>
				This can happen when the page you requested is invalid. <br /> Plase go back to one of our
				main pages, and try again
			</p>

			<div className="nav-links-wrapper">
				<Link className="home-link" to="/home">
					Home
				</Link>
				<Link className="about-link" to="/about">
					About
				</Link>
				<Link className="movies-link" to="/movies">
					Movies
				</Link>
			</div>
		</main>
	);
};

export default NotFound;
