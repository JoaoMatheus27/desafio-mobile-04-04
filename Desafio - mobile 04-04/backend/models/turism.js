const mongoose = require('mongoose');

const turismSchema = new mongoose.Schema({
    name : {type: String, required: true},
    country : {type: String, required:true},
    city : {type : String, required: true},
    price : {type : Number, required: true},
    responsible : {type: mongoose.Schema.Types.ObjectId,ref : 'User', required:false}
});

const Turism = mongoose.model('Turism', turismSchema);

module.exports = Turism;