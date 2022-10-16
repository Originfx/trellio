import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
	return (
		<div className="banner">
			<div className="container">
				<div className="banner__logo">
					<Link to="/" ><span>Trellio</span></Link>
				</div>
			</div>
		</div>
	);
}

export default Banner;