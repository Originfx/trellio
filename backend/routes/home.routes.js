//
// Роутинг
//

module.exports = (app) => {
    // Главная страница
    app.get('/home', (req, res) => {
        res.json("Hello World!");
    })
};