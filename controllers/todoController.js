var bodyParser = require('body-parser')//解析post请求的中间件
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mongoose = require('mongoose');//引入mongoose

mongoose.connect('mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos');//链接数据库

var todoSchema = new mongoose.Schema({//创建一个Schema保证类型以及健壮性
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);//穿件一个model表

// var itemOne = Todo({item: 'buy flowers'}).save(function(err) {//存数据
//   if (err) throw err;
//   console.log('item saved');
// });

// var data = [{'item': '想1'},{'item': '想123123'},{'item': '想66666'}]//数据存在内存中,只要不重启服务器,data就一直存在
module.exports = function (app) {
    app.get('/todo', function (req, res, next) {//获取TODO列表
        Todo.find({},function(err, data){//使用数据库获取列表
            if (err) throw err;
            res.render('todo', { todoList: data })//吧data数组传给前端,让前端渲染
        })//find({}代表祛除所有数据,err代表错误,data代表取出的所有的内容
    })
    app.post('/todo', urlencodedParser, function (req, res, next) {//修改TODO列表
        // data.push(req.body)//把前台传过来的bodypush进data里面去
        Todo(req.body).save(function (err,data) {//使用数句酷保存数据
            if (err) throw err;
            res.send(data)//这里随便写什么,因为是刷新页面的.最后都回到上面的get请求中去
        })
       
    })
    app.delete('/todo/:item', function (req, res, next) {//删除TODO
        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, "-") !== req.params.item
        //     //首先过滤,如果不相等的话就把这个todo返回到新数组.如果相等的话,就是false,就不会返回,相当于删除了,
        // })
        Todo.find({item:req.params.item.replace(/-/g,' ')}).remove(function (err,data) {
            if (err) throw err;
            res.send('3')//这里随便写什么,因为是刷新页面的.最后都回到上面的get请求中去
        })
        
    })
}