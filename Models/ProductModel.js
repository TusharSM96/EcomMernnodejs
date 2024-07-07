const mongoose=require('mongoose')
const Productschema=new mongoose.Schema({
    Prodname:{
        type:String,
        require:true
    },
    ProPrice:{
        type:Number,
        require:true
    },
    Discription:{
        type:String,
        require:true
    },
    Active:{
        type:String,
        default:"Y"
    },
    Category:{
        type:String,
        require:true
    },
    Brand:{
        type:String,
        require:true
    },
    ProductImage:{
        type:Object,
        require:true
    },
    Quntity:{
        type:Number,
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model('productlists',Productschema)