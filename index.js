/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/!*app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});*!/
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
    console.log(req);
    var originalUrl=req.originalUrl;
    var query=req.query;
    var body = req.body;
    var url=req.url;
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

io.on('connection', function (socket) {
    console.log('user:' + socket.id + ' connected');

    socket.broadcast.emit('chat message', {name: socket.id, message: "上线了"});
    socket.on('login', function (nickname) {
        socket.nickname = nickname;
        //socket.broadcast.emit('chat message', {name: socket.nickname, message: "上线了"});
        socket.broadcast.emit('new user', {name: socket.nickname, message: "上线了", fromId: socket.id});
    });
    socket.on('chat message single', function (msgStr, fn) {
        //单人聊天
        console.log('message:' + msgStr);
        var msg = JSON.parse(msgStr);
        if (msg.toId) {
            socket.to(msg.toId).emit('chat message', {name: socket.nickname, message: "这是单独的聊天:" + msg.message});
        }

        socket.emit('chat message', {name: socket.nickname, message: msg}, function (ackMsg) {
            console.log("客户端收到消息后说:" + ackMsg);
        });
        console.log((fn ? fn : "") + "服务端收到消息了,向客户端返回收据吧");
        if (fn)
            fn("我收到:" + msg + "了，你放心吧");
    });
    socket.on('chat message', function (msg, fn) {
        console.log('message:' + msg);

        socket.broadcast.emit('chat message', {name: socket.nickname, message: msg});
        socket.emit('chat message', {name: socket.nickname, message: msg}, function (ackMsg) {
            console.log("客户端收到消息后说:" + ackMsg);
        });
        console.log((fn ? fn : "") + "服务端收到消息了,向客户端返回收据吧");
        if (fn)
            fn("我收到:" + msg + "了，你放心吧");
    });
    socket.on('disconnect', function () {
        console.log('user' + socket.id + ' disconnected');
    });
});
http.listen(4567, function () {
    console.log('listening on *:4567');
});*/
var app = require('express')();
var http = require('http').Server(app);
var api=require('./api/api');
var chat=require('./chat/chat');

api.apiStart();
chat.chatStart();
/*http.listen(4567, function () {
    console.log('listening on *:4567');
});*/


