/**
 * Created by uno on 2017-05-06.
 */

/**test the connection of node.js and mongoDB*/

//引入mongodb模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
//连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/gomall';    //my database -> gomall


/** % write some data into :
 *database:gomall ;
 *collection:Animal;
 *document: {name :"pig",age:3} {name:"bird",age:4};
 */

//定义函数表达式，用于操作数据库并返回结果
var insertData = function(db, callback) {
    //获得指定的集合

    var collection = db.collection('Animal');
    //插入数据
    var data = [{_id:1,"name":'pig',"age":3},{_id:2,"name":'bird',"age":4}];
    collection.insert(data, function(err, result) {
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
}

/**
 * change the data {name:pig,age:3} -> {name:"pig",age:100}
 */
//定义函数表达式，用于操作数据库并返回结果
var updateData = function(db, callback) {
    //获得指定的集合
    var collection = db.collection('Animal');
    //要修改数据的条件，>=10岁的用户
    var  where={name:{"$gte":"pig"}};
    //要修改的结果
    var set={$set:{age:100}};
    collection.updateMany(where,set, function(err, result) {
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
}

/**
 * find data
 */
//定义函数表达式，用于操作数据库并返回结果
var findData = function(db, callback) {
    //获得指定的集合
    var collection = db.collection('Animal');
    //要查询数据的条件，<=10岁的用户
    var  where={name:{"$lte":"pig"}};
    //要显示的字段
    var set={name:1,age:1};
    collection.find(where,set).toArray(function(err, result) {
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
}

/**
 * delete data
 */
//定义函数表达式，用于操作数据库并返回结果
var findData = function(db, callback) {
    //获得指定的集合
    var collection = db.collection('Animal');
    //要删除数据的条件，_id>2的用户删除
    var  where={_id:{"$gt":2}};
    collection.remove(where,function(err, result) {
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
}


/**
 * exe function
 */
//使用客户端连接数据，并指定完成时的回调方法
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    //执行插入数据操作，调用自定义方法
    findData(db, function(result) {
        //显示结果
        console.log(result);
        //关闭数据库
        db.close();
    });
});