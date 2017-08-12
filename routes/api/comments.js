/**
 * comment 路由
 * 作者：黄家钱 Sat Aug 12 2017 17:27:17 GMT+0800 (中国标准时间)
 */

let Comment = require('../../models/Comment');
let express = require('express');
let router = express.Router();

//增加
router.post('/', function (req, res, next) {
    let comment = req.body;
    comment.createTime = new Date();
    new Comment(comment).save(function (err, result) {
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
    Comment.remove({
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
    let comment = req.body;
    comment.updateTime = new Date();
    Comment.update({
        _id: id
    }, comment, function (err, result) {
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
    Comment.findById(id, function (err, result) {
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
        Comment.find(function (err, allResult) {
            if (err) {
                res.send(err);
            } else {
                res.send(allResult);
            }
        });
    } else {
        page = page ? parseInt(page) : 1;
        rows = rows ? parseInt(rows) : 10;
        Comment.find({}).skip((page - 1) * rows).limit(rows).exec(function (err, someResult) {
            if (err) {
                res.send(err);
            } else {
                Comment.find(function (err, allResult) {
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