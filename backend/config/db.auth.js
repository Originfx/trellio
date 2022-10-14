//
// Настройка подключения
//

// Данные для поключения к БД
const mongo = {
    host: '',
    port: '',
    user: '',
    password: '',
    database: '',
};

module.exports = {
    url: "mongodb://" + mongo.user + ":" + mongo.password + "@" + mongo.host + ":" + mongo.port + "/" + mongo.database
}