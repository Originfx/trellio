import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Импорт стилей компонента
import "./style.scss";

const Cards = () => {
	// Получить код доски из адресной строки
	let {code} = useParams()

	// Хук эффекта - при загрузке страницы
	useEffect(() => {
		if (code) {
			// 
		}
	}, [code]) // eslint-disable-line

	return (
		<div className="cards">
			<div className="container">
				<span>Cards</span>
			</div>
		</div>
	);
}

export default Cards;