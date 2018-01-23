/**
 * Created by linchenpeng on 2018/1/23.
 */
var app = require('express')();
var Result = require('../model/result');
var db = require('../db/dbutil');
var bodyParser = require('body-parser');
function apiStart() {
    app.use(bodyParser.urlencoded({extended: false}));
    /*app.get('/', function (req, res) {
        res.sendFile(__dirname+'/index.html');
    });*/
    //登录
    app.post('/login', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        db.queryUser(username, function (user) {
            var result;
            if (user instanceof Error) {
                result = new Result(2, '用户名不存在');
            } else {
                if (user) {
                    if (password === (user['password'])) {
                        result = new Result(1, '登录成功', user);
                    }
                    else {
                        result = new Result(0, '用户名与密码不匹配');
                    }
                } else {
                    result = new Result(2, '用户不存在');
                }
            }
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.write(JSON.stringify(result));
            res.end();
        });
    });
    //注册
    app.post('/register', function (req, res) {
        var query=req.query;
        console.log("query",query);
        var body = req.body;
        console.log("body",body);
        var username = req.body.username;
        var password = req.body.password;
        db.insertUser(username, password, function (user) {
            var result;
            if (user instanceof Error) {
                result = new Result(3, '用户名已存在');
            } else {
                if (user) {
                    result = new Result(1, '注册成功', user);
                } else {
                    result = new Result(3, '用户名已存在');
                }
            }
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.write(JSON.stringify(result));
            res.end();
        });
    });

    app.listen(4567, function (err) {
        if (!err)
            console.log('接口监听4567,服务启动');
        else
            console.error(err);
    });
}
exports.apiStart = apiStart;