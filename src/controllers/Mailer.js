const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

// typeMail = ()=> {
//   switch (type) {
//     case 'singup':
//       return 
//         `<a href="http://localhost:3001/client/verify/?token=${token}">Verificar</a>`
//       break;
//   }
// }

async function mailer(email) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "e.commerce2022shop@gmail.com", // generated ethereal user
        pass: "Henry.2022" // generated ethereal password
      },
    });

    transporter.use('compile', hbs({
      viewEngine: 'express-handlebars',
      viewPath: path.resolve('./views'),
    }))

    let options = await transporter.sendMail({
      from: 'e.commerce2022shop@gmail.com', // sender address
      to: 'juanjo2895@hotmail.com, llamagustin@gmail.com', // list of receivers
      subject: 'sarasa', // Subject line
      text: 'cualca', // plain text body
      template: 'index',
    });
    return options.messageId;
  } catch (error) {
    // console.log(error);
    // console.log(error.errors[0].message);
  }
}

module.exports = mailer