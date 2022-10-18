const LocalStorage = function() {};

// Доски
LocalStorage.boards = {
    // Хранилище
    storage: [],
	// Получить список всех досок из localStorage
	getAll: function() {
		return JSON.parse(localStorage.getItem("boards")) || [];
	},
	// Получить текущую доску из localStorage
	getOne: function(id) {
		this.storage = JSON.parse(localStorage.getItem("boards")) || [];
		return this.storage.filter(el => el.id == id)[0] || [];
	},
	// Создание новой доски
	create: function(name) {
		// Получить список всех досок из localStorage
		this.storage = this.getAll();
		// Уникальный id;
		let id = Date.now() + Math.random();
		// Поместить новую доску
		this.storage.push({ id: id, name: name });
		// Переписать список досок в localStorage
		this.set();
		// Создать стандартный набор карточек
		LocalStorage.cards.default(id);
	},
	// Изменить доску
	edit: function(id, name) {
		// Получить список всех досок из localStorage
		this.storage = this.getAll();
		// Найти доску по id и задать новое имя
		this.storage.map(el => el.id === id && (el.name = name));
		// Переписать список досок в localStorage
		this.set();
	},
	// Удалить доску
    delete: function(id) {
		// Получить список всех досок из localStorage
		this.storage = this.getAll();
		// Отсеять доску по id
		this.storage = this.storage.filter(el => el.id !== id);
		// Переписать список досок в localStorage
		this.set();
		// Удалить все карточки доски
		LocalStorage.cards.getAll().filter(el => el.parent_id == id).map(el => LocalStorage.cards.delete(el.id));

    },
	// Переписать список досок в localStorage
    set: function() {
		localStorage.setItem("boards", JSON.stringify(this.storage));
    }
}

// Карточки
LocalStorage.cards = {
    // Хранилище
    storage: [],
	// Получить список всех карточек из localStorage
	getAll: function() {
		return JSON.parse(localStorage.getItem("cards")) || [];
	},
	// Получить список карточек текущей доски из localStorage
	getOne: function(id) {
		this.storage = JSON.parse(localStorage.getItem("cards")) || [];
		return this.storage.filter(el => el.parent_id == id) || [];
	},
	// Создание новой карточки
	create: function(id, name) {
		// Получить список всех карточек из localStorage
		this.storage = this.getAll();
		// Поместить новую задачу
		this.storage.push({ id: Date.now() + Math.random(), parent_id: id, name: name });
		// Переписать список карточек в localStorage
		this.set();
	},
	// Стандартный набор карточек
	default: function(id) {
		let names = ["Все задачи", "В процессе", "Выполнено"];
		// Создание новых карточек
		names.map(el => this.create(id, el));
	},
	// Удалить карточку
    delete: function(id) {
		// Получить список всех карточек из localStorage
		this.storage = this.getAll();
		// Отсеять доску по id
		this.storage = this.storage.filter(el => el.id !== id);
		// Переписать список карточек в localStorage
		this.set();
		// Удалить все задачи карточки
		LocalStorage.tasks.getAll().filter(el => el.parent_id == id).map(el => LocalStorage.tasks.delete(el.id));
    },
	// Переписать список карточек в localStorage
	set: function() {
		localStorage.setItem("cards", JSON.stringify(this.storage));
    }
}

// Задачи
LocalStorage.tasks = {
    // Хранилище
    storage: [],
	// Получить список всех задач из localStorage
	getAll: function() {
		return JSON.parse(localStorage.getItem("tasks")) || [];
	},
	// Получить список всех задач текущей карточки из localStorage
	getOne: function(id) {
		this.storage = JSON.parse(localStorage.getItem("tasks")) || [];
		return this.storage.filter(el => el.parent_id == id) || [];
	},
	// Создание новой задачи
	create: function(id, name) {
		// Получить список всех задач из localStorage
		this.storage = this.getAll();
		// Поместить новую задачу
		this.storage.push({ id: Date.now() + Math.random(), parent_id: id, name: name });
		// Переписать список задач в localStorage
		this.set();
	},
	// Переместить задачу
    move: function(item, direction) {
		// Получить карточку задачи
		let card = LocalStorage.cards.getAll().filter(el => el.id == item.parent_id)[0];
		// Получить все карточки текущей доски
		let cards = LocalStorage.cards.getAll().filter(el => el.parent_id == card.parent_id);
		// Уточнить столбец карточки
		let index = cards.findIndex(el => el.id == item.parent_id);

		// Возможность перемещения в пределах одной доски
		if (index + direction >= 0 && index + direction < cards.length) {
			// Удалить задачу
			this.delete(item.id);
			// Получить список всех задач из localStorage
			this.storage = this.getAll();
			// Пересоздать задачу в другой карточке
			this.storage.push({...item, parent_id: cards[index + direction].id});
			// Переписать список задач в localStorage
			this.set();
		}
    },
	// Удалить задачу
    delete: function(id) {
		// Получить список всех задач из localStorage
		this.storage = this.getAll();
		// Отсеять задачу по id
		this.storage = this.storage.filter(el => el.id !== id);
		// Переписать список задач в localStorage
		this.set();
    },
	// Переписать список задач в localStorage
    set: function() {
		localStorage.setItem("tasks", JSON.stringify(this.storage));
    }
}

export default LocalStorage;