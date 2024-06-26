const mongoose = require('mongoose')
const Schema =mongoose.Schema
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:Number,required:true},
    role:{type:String,default:'customer'}
},{timestamps:true})

module.exports=mongoose.model('Users',userSchema)