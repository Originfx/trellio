import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// Импорт контекста
import {FlowContext} from "../context";

// Импорт стандартного шаблона
import LayoutDeafult from "../layouts/Default";

// Импорт отдельных страниц
import Boards from "../views/Boards";
import Cards from "../views/Cards";

import NotFound from "../views/NotFound";

const AppRouter = () => {
	// Обмен контекстом - Подгрузка приложения
	let {appLoading} = useContext(FlowContext);

	// Если приложение загружается
	if (appLoading) {
		return "Загрузка...";
	}

	return (
		<Routes>
			<Route path="/" element={<LayoutDeafult />}>
				<Route index element={<Boards />} />

				<Route path="cards/:id" element={<Cards />} />
				
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default AppRouter;