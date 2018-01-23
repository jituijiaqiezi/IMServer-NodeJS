/**
 * Created by linchenpeng on 2017/4/13.
 */
var Sequelize = require('sequelize');
var co = require('co');
var uuid = require('./../util/genuuid');

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
    'testchat_user',
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
        'tableName': 'testchat_user',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        'paranoid': true
    });

var Msg = sequelize.define(
    'testchat_msg',
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
        'tableName': 'testchat_msg',
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


/*User.create({
 username:'lcp',
 password:'lcp',
 user_id:uuid.guid()
 });*/
/*User2.sync();
 var usernames=['lsk','wwk','ypf','ypr','tl','wx','qyq','mjj','hjp','xmh','yxm','jzg','ylj'];
 for(var i in usernames){
 User2.create({username:usernames[i],password:usernames[i],user_id:uuid.guid()});
 }*/

//User.belongsTo(Msg,{foreignKey:'msg_id'});
//User.hasOne(Msg,{foreignKey:'user_id'});
//User.hasMany(Msg);
User.belongsToMany(Msg,{through:MsgUser});
Msg.belongsToMany(User,{through:MsgUser});
MsgUser.sync();
Msg.sync();
User.sync();

