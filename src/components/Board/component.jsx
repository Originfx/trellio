import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Импорт контекста
import {СontextFlow} from "../../context";

// Импорт отдельных частей компонента
import BoardCards from "../BoardCards";

// Импорт стилей компонента
import "./style.scss";

const Board = () => {
	// Получить код доски из адресной строки
	let {id} = useParams()

	// Текущая доска
	let [board, setBoard] = useState([]);

	// Обмен контекстом - Обновление localStorage
	let {updateData} = useContext(СontextFlow);

	// Получить текущую доску из localStorage
	const getBoard = () => {
		let data = JSON.parse(localStorage.getItem("boards"));
		return data.filter(el => el.id == id)[0] || [];
	};

	// Хук эффекта - при первой загрузке
	useEffect(() => {
		// Получить текущую доску из localStorage
		setBoard(getBoard());
	}, [updateData]) // eslint-disable-line

	return (
		<div className="board">
			<div className="container">
				<div className="headline">
					<span>{board.name}</span>
					<p>Ваши карточки</p>
				</div>

				<BoardCards/>
			</div>
		</div>
	);
}

export default Board;