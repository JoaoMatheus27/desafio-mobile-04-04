const mongoose = require('mongoose');

const plansSchema = new mongoose.Schema({
    name : {type: String, required: true},
    action : {type: String, required:true},
    price : {type: Number, required:true},
    responsible : {type: mongoose.Schema.Types.ObjectId,ref : 'User', required:false},
});

const Plans = mongoose.model('Plan', plansSchema);

module.exports = Plans;
