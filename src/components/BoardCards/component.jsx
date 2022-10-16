import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Импорт контекста
import {СontextFlow} from "../../context";

// Импорт отдельных частей компонента
import CardTasks from "../CardTasks";

// Импорт компонента - Иконки
import Icons from "../../ui/Icons";

// Импорт стилей компонента
import "./style.scss";

const BoardCards = () => {
	// Получить код доски из адресной строки
	let {id} = useParams()

	// Список карточек
	let [cards, setCards] = useState([]);
	// Название новой доски
	let [cardName, setCardName] = useState("");
	// Модальное окно
	let [modal, setModal] = useState(false);

	// Обмен контекстом - Обновление localStorage
	let {updateData} = useContext(СontextFlow);
	
	// Получить список карточек текущей доски из localStorage
	const getCards = () => {
		let data = JSON.parse(localStorage.getItem("cards"));
		return data.filter(el => el.parent_id == id) || [];
	};

	// Получить список всех карточек из localStorage
	const getAllCards = () => {
		return JSON.parse(localStorage.getItem("cards")) || [];
	};

	// Создание новой карточки
	const createCard = () => {
		// Получить список всех карточек из localStorage
		let storage = getAllCards();
		// Поместить новую карточку
		storage.push({ id: Date.now(), parent_id: id, name: cardName });
		// Обновить список карточек в localStorage
		updateCards(storage);
		// Закрыть модальное окно
		setModal(false);
		// Очистить название новой карточки
		setCardName("");
	}

	// Удалить карточку
	const deleteСard = (id) => {
		// Получить список всех карточек из localStorage
		let storage = getAllCards();
		// Отсеять карточку по id
		storage = storage.filter(el => el.id !== id);
		// Обновить список карточек в localStorage
		updateCards(storage);
	};

	// Обновить список карточек в localStorage
	const updateCards = (storage) => {
		localStorage.setItem('cards', JSON.stringify(storage));
		// Получить список карточек текущей доски из localStorage
		setCards(getCards());
	};

	// Хук эффекта - при первой загрузке
	useEffect(() => {
		// Получить список карточек текущей доски из localStorage
		setCards(getCards());
	}, [updateData]) // eslint-disable-line

	return (
		<>
			<div className="board-cards">
				{cards.map(el =>
					<div className="board-cards__item" key={el.id}>
						<div className="board-cards__header">
							<span>{el.name}</span>
							<Icons name={"icon-close-thin"} onClick={() => deleteСard(el.id)} />
						</div>

						<CardTasks id={el.id} />
					</div>
				)}

				{cards.length < 3 &&
					<div className="board-cards__add" onClick={() => setModal(true)}>
						<Icons name={"icon-add-thin"} />
					</div>
				}
			</div>


			{modal &&
				<div className="modal">
					<div className="modal__inner">

						<div className="modal__window">
							<form>
								<h3>Создание новой карточки</h3>
								<label>Введите название</label>
								<input
									value={cardName}
									onChange={e => setCardName(e.target.value)}
									autoFocus={true}
								/>
								<button type="submit" onClick={(e) => {e.preventDefault(); createCard()}} >Создать</button>
							</form>
						</div>

						<button onClick={() => setModal(false)}>Отмена</button>
					</div>
				</div>
			}
		</>
	);
}

export default BoardCards;