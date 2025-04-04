const mongoose = require('mongoose');

const plansSchema = new mongoose.Schema({
    action : {type: String, required:true},
    price : {type: Number, required:true},
    responsible : {type: mongoose.Schema.Types.ObjectId,ref : 'User', required:true},
});

const Plans = mongoose.model('Plan', plansSchema);

module.exports = Plans;
