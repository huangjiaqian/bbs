/**
 * module 路由
 * 作者：黄家钱 Wed Aug 09 2017 19:40:33 GMT+0800 (中国标准时间)
 */

let Module = require('../models/Module');
let express = require('express');
let router = express.Router();

//增加
router.post('/', function (req, res, next) {
    let module = req.body;
    module.createTime = new Date();
    new Module(module).save(function (err, result) {
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
    Module.remove({
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
    let module = req.body;
    module.updateTime = new Date();
    Module.update({
        _id: id
    }, module, function (err, result) {
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
    Module.findById(id, function (err, result) {
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
    if (!page || !rows) {
        Module.find(function (err, allResult) {
            if (err) {
                res.send(err);
            } else {
                res.send(allResult);
            }
        });
    } else {
        page = page ? parseInt(page) : 1;
        rows = rows ? parseInt(rows) : 10;
        Module.find({}).skip((page - 1) * rows).limit(rows).exec(function (err, someResult) {
            if (err) {
                res.send(err);
            } else {
                Module.find(function (err, allResult) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            total: allResult.length,
                            rows: someResult,
                        });
                    }
                });
            }
        });
    }
});
module.exports = router;