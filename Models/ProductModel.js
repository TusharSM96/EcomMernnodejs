const mongoose=require('mongoose')
const Productschema=new mongoose.Schema({
    Prodname:{
        type:String,
        required:true
    },
    ProPrice:{
        type:Number,
        required:true
    },
    Discription:{
        type:String,
        required:true
    },
    Active:{
        type:String,
        default:"Y"
    },
    Category:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    ProductImage:{
        type:Object,
        required:true
    },
    Quntity:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('productlists',Productschema)