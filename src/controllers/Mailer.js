const Handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

const filePath = path.join('Reset', '../views/Reset.html');
const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = Handlebars.compile(source);
const hmtlSend = template;

async function mailer(email) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "e.commerce2022shop@gmail.com", // generated ethereal user
        pass: "Henry.2022" // generated ethereal password
      },
    });

    let options = await transporter.sendMail({
      from: 'e.commerce2022shop@gmail.com', // sender address
      to: 'juanjo2895@hotmail.com, llamagustin@gmail.com', // list of receivers
      subject: 'sarasa', // Subject line
      text: 'cualca', // plain text body
      html: source,
    });

    return options.messageId;

  } catch (error) {
    console.log(error);
    // console.log(error.errors[0].message);
  }
}

module.exports = mailer