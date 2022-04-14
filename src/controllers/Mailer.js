const nodemailer = require('nodemailer')
async function main(email, token) {
  try {
    console.log(token);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "llamagustin@gmail.com", // generated ethereal user
        pass: "bqkxqudeipggskfl" // generated ethereal password
      },
    });
    
    let options = await transporter.sendMail({
      from: 'llamagustin@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Soy Juan", // Subject line
      text: "Hello world?", // plain text body
      html: `<a href="http://localhost:3001/client/verify/?token=${token}">Verificar</a>`
      
    });
    return options.messageId;
  } catch(error) {
    console.log(error);
    console.log(error.errors[0].message); }
}

module.exports = main