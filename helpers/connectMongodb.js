const mongoose=require("mongoose");


module.exports=async()=>{
    return await mongoose.connect("mongodb+srv://mehmet:mehmet123@forstudy.40ejz.mongodb.net/forAuth?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex:true,
    })
}