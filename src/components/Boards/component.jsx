import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Импорт - Работа с localStorage
import { readLocalStorage, createLocalStorage, deleteLocalStorage } from '../../utils/localStorage'

// Импорт компонента - Иконки
import Icons from "../../ui/Icons";

// Импорт стилей компонента
import "./style.scss";

const Boards = () => {
	// Список досок
	let [boards, setBoards] = useState( readLocalStorage("boards") );
	// Модальное окно
	let [modal, setModal] = useState(false);
	// Название новой доски
	let [newBoard, setNewBoard] = useState("");

	// Создание доски
	const createBoard = () => {
		// Обновить 
		setBoards( createLocalStorage({ name: newBoard, id: Date.now() }) );
		// Закрыть модальное окно
		setModal(false);
		// Очистить название новой доски
		setNewBoard("");
	}

	// Хук эффекта - при изменении досок
	useEffect(() => {
		console.log(boards)
	}, []) // eslint-disable-line

	return (
		<>
			<div className="boards">
				<div className="container">
					<div className="headline">
						<span>Доски</span>
						<p>Ваши доски</p>
					</div>
					
					<div className="boards__list">

						{boards.map(el =>
							<div className="boards__item" key={el.id}>
								<Link to={"/cards/" + el.id}>{el.name}</Link>
								<span>{el.id}</span>
								<ul>
									<li>Изменить</li>
									<li onClick={() => setBoards( deleteLocalStorage(el.id) )}>Удалить</li>
								</ul>
							</div>
						)}

						{ boards.length < 8 &&
							<div className="boards__add" onClick={() => setModal(true)}>
								<Icons name={"icon-add-thin"} />
							</div>
						}

					</div>
				</div>
			</div>

			{modal && 
				<div className="modal">
					<div className="modal__window">
						<div className="modal__window-new">
							<h3>Создание новой доски</h3>

							<form>
								<label>Введите название</label>
								<input
									value={newBoard}
									onChange={e => setNewBoard(e.target.value)}
								/>

								<button onClick={() => createBoard()}>Создать</button>
								<button onClick={() => setModal(false)}>Отмена</button>
							</form>

							
						</div>

					</div>
				</div>
			}
		</>
	);
}

export default Boards;