//
// Подключение модулей
//

const express = require('express');

const app = express();

//
// Инициализация базы данных
//

//const mongo = require("./models/db.connect");

//
// Параметры
//

// Путь для статических файлов
app.use(express.static(__dirname + './frontend/public'));

// Парсер POST - content-type: application/json
app.use(express.json({ extended: true }));

// Парсер POST - content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//
// Роутинг
//

// Главная страница
require("./routes/home.routes")(app);

//
// Запуск сервера
//

app.listen(3000, () => {
    console.log(`MERN app running at port 3000`);
});
