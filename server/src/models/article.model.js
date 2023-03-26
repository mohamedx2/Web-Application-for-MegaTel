const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    image: {
        type:String
    },poster:{
        type:String,
        required:true
    }
});
module.exports =mongoose.model('Article', ArticleSchema);
