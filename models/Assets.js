const mongoose = require('mongoose');

const AssetsSchema = new mongoose.Schema({
   
   erc20asset:{
    type: String,
    required: true,
    unique:true
   },

   lastscannedblock:{
    type: Number,
    required: true
   }

});



module.exports=Assets=mongoose.model('assets',AssetsSchema);
