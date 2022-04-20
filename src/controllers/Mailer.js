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
    let discount= "";
    let loads ="";
    switch (info.type) {
      case "confirmation":
        filePath = path.join('confirm', '../views/confirm.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = "http://localhost:3000/";
        subject = "Account confirmation";
        loads = ({url})
        break;
      case "invitation":
        filePath = path.join('Invite', '../views/Invite.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `http://localhost:3000/confirm`;
        subject = "Sing up Invitation";
        loads = ({url});
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
        url = `http://localhost:3000/confirm`;
        subject = "You have been invited to share a wishlist";
        break;
      case "offers":
        filePath = path.join('Offers', '../views/Offers.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `http://localhost:3000/`;
        subject = "New offers";
        discount = info.discount
        loads = ({url}, {discount})
        break;
      case "confirmOrder":
        filePath = path.join('ConfirmOrder', '../views/ConfirmOrder.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        subject = "Order confirmation";
        break;
      case "shipped":
        filePath = path.join('Shipped', '../views/Shipped.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `http://localhost:3000/home`;
        subject = "Account confirmation";
        break;
      case "inProcess":
        filePath = path.join('InProcess', '../views/InProcess.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `http://localhost:3000/home`;
        subject = "Account confirmation";
        break;
      default:
        break;
    }
    let options = await transporter.sendMail({
      from: 'e.commerce2022shop@gmail.com', // sender address
      to: user, // list of receivers
      subject: subject, // Subject line
      html: template(loads) // html body
    });
    return options.messageId;

  } catch (error) {
    console.log(error);
    // console.log(error.errors[0].message);
  }
}

module.exports = mailer
