// Найти доски
export const readLocalStorage = (name) => {
	return JSON.parse(localStorage.getItem(name)) || [];
};

// Создать доску
export const createLocalStorage = (template) => {
	let storage = readLocalStorage("boards");
	storage.push(template)
	localStorage.setItem('boards', JSON.stringify(storage))
	return storage;
};

// Обновить доску
export const updateLocalStorage = (a) => {
	return a;
};

// Удалить доску
export const deleteLocalStorage = (id) => {
	let storage = readLocalStorage("boards");
	storage = storage.filter(el => el.id !== id)
	localStorage.setItem('boards', JSON.stringify(storage));
	return storage;
};