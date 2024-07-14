const mongoose=require('mongoose')
const CategorySchema=new mongoose.Schema({
    Catogoryname:{
        type:String,
        required:true,
        unique:true
    },
    Discription:{
        type:String,
        required:true,
    },
    CategoryIcon:{
        type:String,
        required:true
    },
    Active:{
        type:String,
        default:"Y"
    }
},{timestamps:true})
module.exports=mongoose.model('productcategories',CategorySchema)