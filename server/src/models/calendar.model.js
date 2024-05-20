const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var CalendarSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('Calendar', CalendarSchema);
