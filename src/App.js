import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Импорт контекста
import {СontextFlow} from "./context/index";

// Импорт путей маршрутизации приложения
import AppRouter from "./routes";

// Импорт общих стилей
import "./default.css";
import "./fonts.scss";
import "./style.scss";

const App = () => {
	// Подгрузка приложения
	let [appLoading, setAppLoading] = useState(true);

	// Обновление localStorage 
	let [updateData, setUpdateData] = useState(false);

	// Событие localStorage
	window.onstorage = () => {
		// При изменении localStorage - обновить данные.
		setUpdateData(!updateData)
	}


	// Хук эффекта - Один раз
	useEffect(() => {
		// Приложение загружено
		setAppLoading(false);
    }, [])

	return (
		<СontextFlow.Provider
			value={{
				appLoading, updateData
        	}}
		>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</СontextFlow.Provider>
	)
}

export default App;