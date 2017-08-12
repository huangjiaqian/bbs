/**
 * Article 信息
 * 作者：黄家钱 Wed Aug 09 2017 18:40:50 GMT+0800 (中国标准时间)
 */
let mongoose = require('../db/db.js');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    
    createTime: {
        type: Date
    },
    updateTime: {
        type: Date
    }
});
module.exports = mongoose.model('Article', ArticleSchema);