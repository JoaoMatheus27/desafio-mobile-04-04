const mongoose = require('mongoose');

const turismSchema = new mongoose.Schema({
    country : {type: String, required:true},
    city : {type : String, required: true},
    price : {type : Number, required: true},
    responsible : {type: mongoose.Schema.Types.ObjectId,ref : 'User', required:true}
});

const User = mongoose.model('User', turismSchema);

module.exports = User;