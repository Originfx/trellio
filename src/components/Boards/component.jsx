import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Операции хранилища
import LocalStorage from "../../utils/localStorage";

// Импорт контекста
import {СontextFlow} from "../../context";

// Импорт компонента - Иконки
import Icons from "../../ui/Icons";

// Импорт стилей компонента
import "./style.scss";

const Boards = () => {
	// Список досок
	let [boards, setBoards] = useState([]);
	// Название новой доски
	let [boardName, setBoardName] = useState("");
	// Модальное окно
	let [modal, setModal] = useState(false);

	// Обмен контекстом - Подгрузка приложения
	let {updateData} = useContext(СontextFlow);

	// Создание новой доски
	const createBoard = () => {
		LocalStorage.boards.create(boardName);
		// Обновить список
		getBoards();
		// Закрыть модальное окно
		setModal(false);
		// Очистить название новой доски
		setBoardName("");
	}

	// Изменить доску
	const editBoard = (id) => {
		LocalStorage.boards.edit(id, boardName)
		// Обновить список
		getBoards();
		// Закрыть модальное окно
		setModal(false);
		// Очистить название новой доски
		setBoardName("");
	};

	// Удалить доску
	const deleteBoard = (id) => {
		LocalStorage.boards.delete(id);
		// Обновить список
		getBoards();
	};

	// Получить список досок из localStorage
	const getBoards = () => {
		setBoards(LocalStorage.boards.getAll());
	};

	// Хук эффекта - при обновление localStorage
	useEffect(() => {
		// Получить список досок из localStorage
		getBoards();
	}, [updateData]) // eslint-disable-line

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
								<Link to={"/board/" + el.id}>{el.name}</Link>
								<span>{el.id}</span>
								<ul>
									<li onClick={() => setModal(el)}>Изменить</li>
									<li onClick={() => deleteBoard(el.id)}>Удалить</li>
								</ul>
							</div>
						)}

						{boards.length < 8 &&
							<div className="boards__add" onClick={() => setModal(true)}>
								<Icons name={"icon-add-thin"} />
							</div>
						}
					</div>
				</div>
			</div>

			{modal &&
				<div className="modal">
					<div className="modal__inner">
						{modal.id
						?	
							<div className="modal__window">
								<form>
									<h3>Изменение доски</h3>
									<label>Введите новое название</label>
									<input
										value={boardName}
										onChange={e => setBoardName(e.target.value )}
										autoFocus={true}
									/>
									<button type="submit" onClick={(e) => {e.preventDefault(); editBoard(modal.id)}} >Изменить</button>
								</form>
							</div>
						:
							<div className="modal__window">
								<form>
									<h3>Создание новой доски</h3>
									<label>Введите название</label>
									<input
										value={boardName}
										onChange={e => setBoardName(e.target.value)}
										autoFocus={true}
									/>
									<button type="submit" onClick={(e) => {e.preventDefault(); createBoard()}} >Создать</button>
								</form>
							</div>
						}

						<button onClick={() => setModal(false)}>Отмена</button>
					</div>
				</div>
			}
		</>
	);
}

export default Boards;