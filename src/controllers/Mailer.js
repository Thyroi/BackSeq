const Handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

// const filePath = path.join('Reset', '../views/Reset.html');
// const source = fs.readFileSync(filePath, 'utf-8').toString();
// const template = Handlebars.compile(source);
// const hmtlSend = template;
async function mailer(info) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "e.commerce2022shop@gmail.com", // generated ethereal user
        pass: "Henry.2022" // generated ethereal password
      },
    });
    let filePath = "";
    let source = "";
    let template = "";
    let user = info.email;
    let url = ``;
    let subject = "";
    switch (info.type) {
      case "confirmation":
        filePath = path.join('confirm', '../views/confirm.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `http://localhost:3000/confirm?token=${info.token}`;
        subject = "Account confirmation";
        break;
      case "reset":
        filePath = path.join('Reset', '../views/Reset.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        subject = "Reset password";
        url = `http://localhost:3000/reset?token=${info.token}`;
        break;
      case "wishlist":
        filePath = path.join('Wishlistinvite', '../views/Wishlistinvite.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `http://localhost:3000/confirm?token=${info.token}`;
        subject = "Account confirmation";
        break;
      default:
        break;
    }
    let options = await transporter.sendMail({
      from: 'e.commerce2022shop@gmail.com', // sender address
      to: user, // list of receivers
      subject: subject, // Subject line
      html: template({ url })
    });
    return options.messageId;

  } catch (error) {
    console.log(error);
    // console.log(error.errors[0].message);
  }
}

module.exports = mailer