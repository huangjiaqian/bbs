/**
 * Topic 信息 ( 主题内容 )
 * 作者：黄家钱 Wed Aug 09 2017 18:43:37 GMT+0800 (中国标准时间)
 */
let mongoose = require('../db/db.js');
let Schema = mongoose.Schema;

let TopicSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    userId: {
        type: String
    },
    createTime: {
        type: Date
    },
    updateTime: {
        type: Date
    }
});
module.exports = mongoose.model('Topic', TopicSchema);