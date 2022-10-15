import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<section className="error">
				<Link to="/">
					<div className="tools">
						<span>
							<h3>Уходим отсюда</h3>
							<p>Вернуться на главную</p>
						</span>
					</div>
				</Link>
			</section>
		</>
	);
}

export default NotFound;