/**
 * Created by linchenpeng on 2017/4/13.
 */
var Sequelize = require('sequelize');
var co = require('co');
var uuid = require('../util/genuuid');

var sequelize = new Sequelize(
    'socketio',
    'root',
    '',
    {
        'timezone': '+08:00',
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306,
        'define': {
            'underscored': true
        }
    }
);

var User = sequelize.define(
    'chat_user',
    {
        'username': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'unique': true
        },
        'password': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'user_id': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'unique': true
        }
    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'chat_user',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        'paranoid': true
    });

var Msg = sequelize.define(
    'chat_msg',
    {
        'message': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'from': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'to': {
            'type': Sequelize.STRING,
            'allowNull': true
        },
        'msg_id': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'unique': true
        }

    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'chat_msg',
        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
        // 将deletedAt字段改名
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        'paranoid': true
    });

var MsgUser = sequelize.define(
    "msg_user",
    {
        is_received: {
            'type': Sequelize.BOOLEAN
        }
    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'msg_user',
        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
        // 将deletedAt字段改名
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        'paranoid': true
    });

function queryUser(username, callback) {
    User.findOne({
        attributes: ['username', 'password', 'user_id'],
        where: {username: username}
    }).then(function (user) {
        if (user)
            user = user['dataValues'];
        callback(user);
    }).catch(function (err) {
        console.error(err);
        callback(err);
    });
}
exports.queryUser = queryUser;

function insertUser(username, password, callback) {
    User.create({
        attributes: ['username', 'password', 'user_id'],
        username: username, password: password, user_id: uuid.guid()
    }).then(function (user) {
        callback(user);
    }).catch(function (err) {
        console.error(err);
        callback(err);
    });
}
exports.insertUser = insertUser;

function insertMsg(msg,callback) {
    Msg.create({
        message: msg['message'], from: msg['from'], msg_id: uuid.guid()
    }).then(function (msg) {
        callback(msg);
    }).catch(function (err) {
        console.error(err);
        callback(err);
    });
}
exports.insertMsg=insertMsg;