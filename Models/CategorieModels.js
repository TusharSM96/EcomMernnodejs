const mongoose=require('mongoose')
const CategorySchema=new mongoose.Schema({
    Catogoryname:{
        type:String,
        require:true,
        unique:true
    },
    Discription:{
        type:String,
        require:true,
    },
    CategoryIcon:{
        type:String,
        require:true
    },
    Active:{
        type:String,
        default:"Y"
    }
},{timestamps:true})
module.exports=mongoose.model('productcategories',CategorySchema)