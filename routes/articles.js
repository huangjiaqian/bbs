/**
 * article 路由
 * 作者：黄家钱 Wed Aug 09 2017 19:40:33 GMT+0800 (中国标准时间)
 */

let Article = require('../models/Article');
let express = require('express');
let router = express.Router();

//增加
router.post('/', function (req, res, next) {
    let article = req.body;
    article.createTime = new Date();
    new Article(article).save(function (err, result) {
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
    Article.remove({
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
    let article = req.body;
    article.updateTime = new Date();
    Article.update({
        _id: id
    }, article, function (err, result) {
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
    Article.findById(id, function (err, result) {
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
        Article.find(function (err, allResult) {
            if (err) {
                res.send(err);
            } else {
                res.send(allResult);
            }
        });
    } else {
        page = page ? parseInt(page) : 1;
        rows = rows ? parseInt(rows) : 10;
        Article.find({}).skip((page - 1) * rows).limit(rows).exec(function (err, someResult) {
            if (err) {
                res.send(err);
            } else {
                Article.find(function (err, allResult) {
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