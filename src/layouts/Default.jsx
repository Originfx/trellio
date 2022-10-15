import React from "react";

// Импорт частей приложения
import Banner from "./partials/Banner";
import Footer from "./partials/Footer";

// Вывод отдельной страницы
import { Outlet } from "react-router-dom";

const TemplateDefault = () => {
	return (
		<div className="app">
			<header><Banner /></header>
			<main><Outlet /></main>
			<footer><Footer /></footer>
		</div>
	)
}

export default TemplateDefault;