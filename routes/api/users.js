/**
 * user 路由
 * 作者：黄家钱 Sat Aug 12 2017 17:27:17 GMT+0800 (中国标准时间)
 */

let User = require('../../models/User');
let express = require('express');
let md5 = require('md5');
let router = express.Router();

//增加
router.post('/', function (req, res, next) {
    let user = req.body;
    user.password = md5(user.password);
    user.createTime = new Date();
    new User(user).save(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
//删除
router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    User.remove({
        _id: id
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
//修改
router.put('/:id', function (req, res, next) {
    let id = req.params.id;
    let user = req.body;
    user.password = md5(user.password);
    user.updateTime = new Date();
    User.update({
        _id: id
    }, user, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
//查询
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    User.findById(id, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
//查询 ( 例：?page=1&rows=10 )
router.get('', function (req, res, next) {
    let page = req.query.page;
    let rows = req.query.rows;
    // 查询全部
    if (!page) {
        User.find(function (err, allResult) {
            if (err) {
                res.send(err);
            } else {
                res.send(allResult);
            }
        });
    } else {
        page = page ? parseInt(page) : 1;
        rows = rows ? parseInt(rows) : 10;
        User.find({}).skip((page - 1) * rows).limit(rows).exec(function (err, someResult) {
            if (err) {
                res.send(err);
            } else {
                User.find(function (err, allResult) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            total: allResult.length,
                            list: someResult,
                        });
                    }
                });
            }
        });
    }
});
module.exports = router;