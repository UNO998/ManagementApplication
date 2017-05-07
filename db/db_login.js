/**
 * Created by uno on 2017-05-06.
 */

/**everyThing about login*/

//引入mongodb模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
//连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/gomall';    //my database -> gomall

/**
 * create a user for database :gomall
 * unfinish-> unhandledPromiseRejection (Exception unhandled)
 */
var createUser = function(db,callback) {

    db.addUser({
        user: "shenyiran",
        pwd: "shenyiran",
        customData: {employeeId: 12345},
        roles: [{role: "readWrite", db: "gomall"}]
    })

    // Add a user to the database
    db.addUser('shenyiran', '1234', {
        roles: [
            "readWrite"
        ]
    }, function(err, result) {
        if (err) {

            return console.log(err);

        }
        callback(result);
        console.log("Added.");
    });
}

/**
 * authority to access the database: gomall
 * user:"shenyiran"
 * password:"shenyiran"
 */
var login = function(db,callback){
    db.auth(db,"shenyiran","shenyiran", function(err, result) {
        if (err) {

            return console.log(err);

        }
        callback(result);
        console.log("Added.");
    });
}



/**
 * exe function
 */
//使用客户端连接数据，并指定完成时的回调方法
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");

    //create user
    // createUser(db, function(result) {
    //     //显示结果
    //     console.log(result);
    //     // 关闭数据库
    //     db.close();
    // });

    //authroty to access the database
    login(db,function(result){
        console.log(result);
        db.close();
    });

});