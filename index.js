import * as fs from "fs";
import express from 'express';

const PORT = 9000;
const app = express();

// читаем файл, парсим его в json, извлекаем поле quotes, которое является массивом
const db = JSON.parse(fs.readFileSync('./database.json').toString())["quotes"];
// читаем файл, просто храним его как строку
const indexHtml = fs.readFileSync('./index.html').toString();

// описываем url-маршрут и его колбэк 
const routes = {
    '/': function (req,res) {
        console.log(`Пришел запрос от ${req.ip} | Возвращаем строку`);
        res.status(200).send(indexHtml);
    },
    '/quotes': function (req,res) {
        const randomIndex = Math.floor(Math.random() * db.length);
        const quote = db[randomIndex];

        console.log(`Отправляем ${req.ip} случайную цитату`)
        res.set('Content-Type', 'text/plain')
        res.status(200).send(quote);
    }
}

// регистрируем все обработчики
for (let path in routes) {
    let callback = routes[path];
    app.get(path, callback);
}

// запускаем сервер
app.listen(PORT, function () {
    console.log(`Server listen on port ${PORT}`);
})