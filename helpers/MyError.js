module.exports=class MyError extends Error{
    constructor(type,message,code){
        super(message)
        this.type=type,
        this.code=code
    }
}