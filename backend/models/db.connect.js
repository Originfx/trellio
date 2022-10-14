//
// Подключение к mongoDB
//

// Модуль
const MongoClient = require("mongodb").MongoClient;
// Параметры подключения
const dbConnect = require("../config/db.auth");
// Шаблон подключения
const client = new MongoClient(dbConnect.url);

//
// Подключение
//

// Подготовка и проверка базы
(async () => {
    try {
        // Подключение
        await client.connect();
        console.log('Connected')
    } catch (err) {
        console.log(err);
    } finally {
        // Закрываем подключение
        await client.close();
    }
})();