// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
const fs = require('fs')
// определяем обработчик для маршрута "/"
app.get("/", function(req, res) {
	//сообщение в консоли
	console.log("someone on server");
	//res.sendFile('index.html', { root: __dirname });
	function getRandomLine(database){
	  fs.readFile(database, function(err, data){
		if(err) throw err;
		var lines = data.split('\n');
		res.end(lines[Math.floor(Math.random()*lines.length)]);
	 })
	}
});
app.get("/quote", function(req, res) {
	//ответ сервера
	res.sendFile('quote.html', { root: __dirname });
});

//подключение к порту
app.listen(3000);