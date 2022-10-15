import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Импорт контекста
import {FlowContext} from "./context/index";

// Импорт путей маршрутизации приложения
import AppRouter from "./routes";

// Импорт общих стилей
import "./default.css";
import "./fonts.scss";
import "./style.scss";

const App = () => {
	// Подгрузка приложения
	let [appLoading, setAppLoading] = useState(true);

	// Хук эффекта - Один раз
	useEffect(() => {
		// Приложение загружено
		setAppLoading(false);
    }, [])

	return (
		<FlowContext.Provider
			value={{
				appLoading,
        	}}
		>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</FlowContext.Provider>
	)
}

export default App;