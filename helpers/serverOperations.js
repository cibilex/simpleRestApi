const { hash } = require("bcrypt");
const jwt=require("jsonwebtoken")

const bcrypt=require("bcrypt");
const crypto=require("crypto");

module.exports.createHash=()=>{
    let randomBayt=crypto.randomBytes(20).toString("hex")
    console.log(randomBayt)
    return crypto.createHash("sha256").update(randomBayt).digest("hex")
}

module.exports.bcryptCompare=async(password,hash)=>{
    return await bcrypt.compare(password,hash)
}
module.exports.generateToken=(peyload)=>{
    const {TOKEN_EXPIRED,TOKEN_SIGNATURE}=process.env
    return  jwt.sign(peyload,TOKEN_SIGNATURE,{expiresIn:TOKEN_EXPIRED})
}
module.exports.jwtCookieControl=(req)=>{
    return req.cookies.token && req.cookies.token.startsWith("Bearer:")
}
module.exports.getJwtCookie=(req)=>{
    return req.cookies.token.split(" ")[1]
}
module.exports.jwtVerify=(token)=>{
    return jwt.verify(token,process.env.TOKEN_SIGNATURE)
}