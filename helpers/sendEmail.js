const nodemailer=require("nodemailer");


module.exports.sendEmail=(peyload)=>{
    const transporter=nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user:peyload.from,
            pass:"Mankurt543aaad"
        }
    })
    return transporter.sendMail(peyload)
}