const LocalStorage = function() {};

// Доски
LocalStorage.boards = new Object({
    // Список доменов из localStorage если нет то пустой массив
    storage: JSON.parse(localStorage.getItem("boards"))|| [],
	// Получить текущую доску из localStorage
	get: function(id) {
		return this.storage.filter(el => el.id == id)[0] || [];
	},
	// Создание новой доски
	create: function(name) {
		let id = Date.now() + Math.random();
		// Поместить новую доску
		this.storage.push({ id: id, name: name });
		// Обновить список досок в localStorage
		this.update();
		// Создать стандартный набор карточек
		LocalStorage.cards.default(id);
	},
	// Изменить доску
	edit: function(id, name) {
		// Найти доску по id и задать новое имя
		this.storage.map(el => el.id === id && (el.name = name));
		// Обновить список досок в localStorage
		this.update();
	},
	// Удалить доску
    delete: function(id) {
		// Отсеять доску по id
		this.storage = this.storage.filter(el => el.id !== id);
		// Обновить список досок в localStorage
		this.update();
    },
	// Обновить список досок в localStorage
    update: function() {
		localStorage.setItem("boards", JSON.stringify(this.storage));
    }
})

// Карточки
LocalStorage.cards = new Object({
    // Список доменов из localStorage если нет то пустой массив
    storage: JSON.parse(localStorage.getItem("cards"))|| [],
	// Получить список карточек текущей доски из localStorage
	get: function(id) {
		return this.storage.filter(el => el.parent_id == id) || [];
	},
	// Создание новой карточки
	create: function(id, name) {
		// Поместить новую задачу
		this.storage.push({ id: Date.now() + Math.random(), parent_id: id, name: name });
		// Обновить список карточек в localStorage
		this.update();
	},
	// Стандартный набор карточек
	default: function(id) {
		let names = ["Все задачи", "В процессе", "Выполнено"];
		// Создание новых карточек
		names.map(el => this.create(id, el));
	},
	// Удалить карточку
    delete: function(id) {
		// Отсеять доску по id
		this.storage = this.storage.filter(el => el.id !== id);
		// Обновить список карточек в localStorage
		this.update();
    },
	// Обновить список карточек в localStorage
	update: function() {
		localStorage.setItem("cards", JSON.stringify(this.storage));
    }
})

// Задачи
LocalStorage.tasks = new Object({
    // Список доменов из localStorage если нет то пустой массив
    storage: JSON.parse(localStorage.getItem("tasks"))|| [],
	// Получить список всех задач текущей карточки из localStorage
	get: function(id) {
		return this.storage.filter(el => el.parent_id == id) || [];
	},
	// Создание новой задачи
	create: function(id, name) {
		// Поместить новую задачу
		this.storage.push({ id: Date.now() + Math.random(), parent_id: id, name: name });
		// Обновить список задач в localStorage
		this.update();
	},
	// Переместить задачу
    move: function(item, direction) {
		// Получить список карточек текущей доски из localStorage
		// let x = LocalStorage.cards.get(item.parent_id).findIndex(el => el.id == item.parent_id );
		let cards = LocalStorage.cards.storage.filter(el => el.id == item.parent_id)[0];
		let boards = LocalStorage.boards.storage.filter(el => el.id == cards.parent_id);

		console.log(boards);
		// Удалить задачу
		//this.delete(item.id);
		// Пересоздать задачу в другой карточке
		//this.storage.push({...item, parent_id: cards[x + direction].id});
		// Обновить список задач в localStorage
		//this.update();
    },
	// Удалить задачу
    delete: function(id) {
		// Отсеять задачу по id
		this.storage = this.storage.filter(el => el.id !== id);
		// Обновить список задач в localStorage
		this.update();
    },
	// Обновить список задач в localStorage
    update: function() {
		localStorage.setItem("tasks", JSON.stringify(this.storage));
    }
})

export default LocalStorage;