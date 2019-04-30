var express = require('express')
var app = express()
var todoController = require('./controllers/todoController')

app.set('view engine', 'ejs')//设置模板引擎为ejs
app.use(express.static('./public'))
todoController(app)
app.listen(3000)
console.log('app 3000');
