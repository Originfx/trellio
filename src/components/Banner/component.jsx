import React from "react";
import { Link } from "react-router-dom";

// Импорт стилей компонента
import "./style.scss";

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