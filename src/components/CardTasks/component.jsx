import React, { useContext, useEffect, useState } from "react";

// Импорт контекста
import {СontextFlow} from "../../context";

// Импорт компонента - Иконки
import Icons from "../../ui/Icons";

// Импорт стилей компонента
import "./style.scss";

const CardTasks = ({id}) => {
	// Список досок
	let [tasks, setTasks] = useState([]);
	// Название новой задачи
	let [taskName, setTaskName] = useState("");
	// Модальное окно
	let [modal, setModal] = useState(false);

	// Обмен контекстом - Обновление localStorage
	let {updateData} = useContext(СontextFlow);

	// Получить список всех задач текущей карточки из localStorage
	const getTasks = () => {
		let data = JSON.parse(localStorage.getItem("tasks")) || [];
		return data.filter(el => el.parent_id == id) || [];
	};

	// Получить список всех задач текущей карточки из localStorage
	const getAllTasks = () => {
		return JSON.parse(localStorage.getItem("tasks")) || [];
	};

	// Создание новой задачи
	const createTask = () => {
		// Получить список всех задач из localStorage
		let storage = getAllTasks();
		// Поместить новую задачу
		storage.push({ id: Date.now(), parent_id: id, text: taskName });
		// Обновить список задач в localStorage
		updateTasks(storage);
		// Закрыть модальное окно
		setModal(false);
		// Очистить название новой задачи
		setTaskName("");
	}

	// Удалить задачу
	const deleteTask = (id) => {
		// Получить список всех задач из localStorage
		let storage = getAllTasks();
		// Отсеять карточку по id
		storage = storage.filter(el => el.id !== id);
		// Обновить список задач в localStorage
		updateTasks(storage);
	};

	// Обновить список задач в localStorage
	const updateTasks = (storage) => {
		localStorage.setItem('tasks', JSON.stringify(storage));
		// Получить список всех задач текущей карточки из localStorage
		setTasks(getTasks());
	};

	// Хук эффекта - при первой загрузке
	useEffect(() => {
		// Получить список всех задач текущей карточки из localStorage
		setTasks(getTasks());
	}, [updateData]) // eslint-disable-line

	return (
		<>
			<div className="card-tasks">
				<div className="card-tasks__list">
					{tasks.map(el =>
						<div className="card-tasks__item" key={el.id}>
							<span>{el.text}</span>
							<Icons name={"icon-remove-thin"} onClick={() => deleteTask(el.id)} />
						</div>
					)}
				</div>

				<div className="card-tasks__add" onClick={() => setModal(true)}>
					<span><Icons name={"icon-add-thin"} /> Добавить задачу</span>
				</div>
			</div>

			{modal &&
				<div className="modal">
					<div className="modal__inner">

						<div className="modal__window">
							<form>
								<h3>Создание новой задачи</h3>
								<label>Введите название</label>
								<input
									value={taskName}
									onChange={e => setTaskName(e.target.value )}
									autoFocus={true}
								/>
								<button type="submit" onClick={(e) => {e.preventDefault(); createTask()}} >Создать</button>
							</form>
						</div>

						<button onClick={() => setModal(false)}>Отмена</button>
					</div>
				</div>
			}
		</>
	);
}

export default CardTasks;