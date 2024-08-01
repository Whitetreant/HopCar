const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = Schema({
    numberPlate: {type: String, default: null},
    brand: {type: String, default: null},
    model: {type: String, default: null},
    note: {type: Array, default: null},  
    year: {type: Number, default: null},
},
{timestamps: true},);

const Car = mongoose.model("carSchema", carSchema);
module.exports = Car;