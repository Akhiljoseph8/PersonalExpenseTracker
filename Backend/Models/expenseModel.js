const mongoose = require('mongoose')

const expenseSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    
})

const expenses=mongoose.model('expenses',expenseSchema)
module.exports=expenses