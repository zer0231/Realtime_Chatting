const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortSchema = new Schema(
    {
    Name: {type:String, required:true},
    Description: {type:String, required:true},
    Qualification: {type:String, required:true}
    }
    ,{timestamps:true});

const PortFolio = mongoose.model('PortF',PortSchema);
module.exports = PortFolio;


