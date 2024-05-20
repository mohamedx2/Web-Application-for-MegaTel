const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var joinSchema = new mongoose.Schema({
    key:{
        type:"string",
        required:true,
        unique:true
    }
});

//Export the model
module.exports = mongoose.model('Join', joinSchema);