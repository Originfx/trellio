import React from "react";

// Импорт стилей компонента
import  "./style.scss";

const Icons = ({name, onClick}) => {
	return (
		<i className={`icon ${name}`} onClick={onClick}></i>
	);
}

export default Icons;