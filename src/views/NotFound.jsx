import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="error">
			<div className="container">
				<div className="headline">
					<span>Страница не найдена</span>
					<Link to="/"><p>Вернуться на главную</p></Link>
				</div>
			</div>
		</div>
	);
}

export default NotFound;