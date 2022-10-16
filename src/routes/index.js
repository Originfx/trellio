import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// Импорт контекста
import {СontextFlow} from "../context";

// Импорт стандартного шаблона
import LayoutDeafult from "../layouts/Default";

// Импорт отдельных страниц
import Boards from "../views/Boards";
import Board from "../views/Board";

import NotFound from "../views/NotFound";

const AppRouter = () => {
	// Обмен контекстом - Подгрузка приложения
	let {appLoading} = useContext(СontextFlow);

	// Если приложение загружается
	if (appLoading) {
		return "Загрузка...";
	}

	return (
		<Routes>
			<Route path="/" element={<LayoutDeafult />}>
				<Route index element={<Boards />} />

				<Route path="board/:id" element={<Board />} />
				
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default AppRouter;