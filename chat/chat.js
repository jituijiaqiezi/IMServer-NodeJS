/**
 * Created by linchenpeng on 2018/1/23.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
function chatStart() {
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

            socket.emit('chat message', {name: socket.nickname, message: msg.message}, function (ackMsg) {
                console.log("客户端收到消息后说:" + ackMsg);
            });
            console.log((fn ? fn : "") + "服务端收到消息了,向客户端返回收据吧");
            if (fn)
                fn("我收到:" + msg + "了，你放心吧");
        });
        socket.on('chat message', function (msg, fn) {
            console.log('message:' + msg);
            var message=msg.message;
            socket.broadcast.emit('chat message', {name: socket.nickname, message: message});
            socket.emit('chat message', {name: socket.nickname, message: message}, function (ackMsg) {
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

    http.listen(3456, function () {
        console.log('listening on *:3024');
    });
}
exports.chatStart=chatStart;