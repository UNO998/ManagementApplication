# Management Application

Fall就快要上完了，寒假没银子出去玩，蹲家里撸个project吧，想练习一下node和js，瞎想出这么一个idea...

## 简述

这是一个为个体商户设计的一个小型管理软件，用于管理日常的销售，统计销量，分析盈亏等。本软件基于nodejs，使用浏览器为用户呈现操作界面，是一个C/S型应用。

需要使用的技术应该有（可能需要更多，单击连接可以跳转到相应的页面）：

- [HTML](http://www.w3schools.com/html/default.asp) & [CSS](http://www.w3schools.com/css/)
- [Bootstrap](http://getbootstrap.com)
- [Javascript](http://www.w3schools.com/js/default.asp) & [JQuery](http://www.w3schools.com/jquery/default.asp)
- HTTP
- [Node.js](https://nodejs.org/en/) & [Express Framework](http://expressjs.com)
- [pug](https://pugjs.org/api/getting-started.html) (template for Express)
- [Json](http://www.json.org)
- DataBase (perhaps [MongoDB](https://docs.mongodb.com) or SQLite)

## 功能设计

### 注册

首次启动本应用，应该先配置一个新的用户。允许在一个设备上，以不同的用户信息，登录不同的账户。非首次登录，应该提供“添加一个新用户”的入口。

### 登录

为了保护用户信息，应该提供一个登录功能（提供记住用户名和密码功能）。在往后的各个模块当中，都应该先检查权限，超过**一定的时间**没有操作，需要重新验证用户身份（可以让用户自行确定“锁定的时间”，以及是否开启该项功能）。

### 商品管理

- 提供一个可以让用户批量导入商品的功能（直接在应用内批量输入，从excel导入，从txt文件导入等，需要按照一定的格式）
- 可以随时查看目前存在的所有商品，并修改各个商品的属性

### 订单管理

- 提供一个创建订单的功能，列出客户购买了什么商品，以及客户的信息
- 可以将该订单转成PDF格式，并打印出来
- 确认订单后，其中的数据自动归入到统计信息当中，方便进行各种销量以及盈亏统计

### 统计&分析

根据已有信息，进行销量统计和盈亏分析，生成各类可视化的统计和分析表格（宝宝不会写啊，有念商科的来写写要啥统计啥数据嘛...）。

- 将统计信息生成excel表格或者PDF文件

### 自动备份

每隔一定的时间，保存当前系统的快照，防止数据丢失。

- 将核心数据文件保存到一个特定的地方
- 提供给自己发邮件保存，将核心数据文件打包，发送到指定的邮箱内进行保存

## 参与开发

1. 希望参与开发本应用的童鞋，可以用`Management Application`为主题发邮件到`haotao.lai@gmail.com`，我会将你添加到`maillist`里面，方便大家交流
2. 代码托管在github上，参与前需要学习git的基本操作
3. 有更好功能设计想法，大大的欢迎提出





