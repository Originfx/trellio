import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Операции хранилища
import LocalStorage from "../../utils/localStorage";

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
		setBoard(LocalStorage.boards.get(id));
	};

	// Хук эффекта - при первой загрузке
	useEffect(() => {
		// Получить текущую доску из localStorage
		getBoard();
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