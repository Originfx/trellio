import React, { useContext, useEffect, useState } from "react";

// Операции хранилища
import LocalStorage from "../../utils/localStorage";

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

	// Обмен контекстом - Обновление данных из localStorage
	let {updateData, setUpdateData} = useContext(СontextFlow);

	// Создание новой задачи
	const createTask = () => {
		LocalStorage.tasks.create(id, taskName);
		// Обновить список
		getTasks();
		// Закрыть модальное окно
		setModal(false);
		// Очистить название новой задачи
		setTaskName("");
	}

	// Создание новой задачи
	const moveTask = (el, direction) => {
		LocalStorage.tasks.move(el, direction);
		// Обновление данных из localStorage
		setUpdateData(!updateData)
	}

	// Удалить задачу
	const deleteTask = (id) => {
		LocalStorage.tasks.delete(id);
		// Обновить список
		getTasks();
	};

	// Получить список всех задач текущей карточки из localStorage
	const getTasks = () => {
		setTasks(LocalStorage.tasks.getOne(id));
	};

	// Хук эффекта - при обновление localStorage
	useEffect(() => {
		// Получить список всех задач текущей карточки из localStorage
		getTasks();
	}, [updateData]) // eslint-disable-line

	return (
		<>
			<div className="card-tasks">
				<div className="card-tasks__list">
					{tasks.map(el =>
						<div className="card-tasks__item" key={el.id}>
							<span>{el.name}</span>
							<div className="card-tasks__controls">
								<Icons name={"icon-arrow-left"} onClick={() => moveTask(el, -1)} />
								<Icons name={"icon-arrow-right"} onClick={() => moveTask(el, 1)} />
								<Icons name={"icon-remove-thin"} onClick={() => deleteTask(el.id)} />
							</div>
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