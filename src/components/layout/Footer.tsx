import { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<Fragment>
			<footer className="footer">
				<div className="content-wrapper">
					<div className="services">
						<Link to="/about">About</Link>
						<Link to="/about">Terms of Service</Link>
						<Link to="/about">Privacy Policy</Link>
						<Link to="/about">Support</Link>
						<Link to="/about">Contact Us</Link>
					</div>
					<div className="copyright">
						<p>MyMovies created by YUNKEUN JO</p>
						<p className="ampersand">&</p>
						<p>Copyright &copy; 2022 JYK LLC. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</Fragment>
	);
};

export default Footer;
