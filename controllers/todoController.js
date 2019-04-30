var bodyParser = require('body-parser')//解析post请求的中间件
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var data = [
    {
        'item': '想1'
    },
    {
        'item': '想123123'
    },
    {
        'item': '想66666'
    }
]//数据存在内存中,只要不重启服务器,data就一直存在
module.exports = function (app) {
    app.get('/todo', function (req, res, next) {//获取TODO列表
        res.render('todo', { todoList: data })//吧data数组传给前端,让前端渲染
    })
    app.post('/todo', urlencodedParser, function (req, res, next) {//修改TODO列表
        data.push(req.body)//把前台传过来的bodypush进data里面去
        res.send(data)
    })
    app.delete('/todo/:item', function (req, res, next) {//删除TODO
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, "-")!==req.params.item
            //首先过滤,如果不相等的话就把这个todo返回到新数组.如果相等的话,就是false,就不会返回,相当于删除了,
        })
        res.send('3')
    })
}