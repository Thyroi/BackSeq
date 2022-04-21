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
    let code ="";
    let loads ="";
    let token ="";
    switch (info.type) {
      case "confirmation":
        filePath = path.join('confirm', '../views/confirm.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = "https://frontend-five-gules.vercel.app/verification";
        subject = "Account confirmation";
        token = info.token;
        loads = ({url, token})
        break;
      case "invitation":
        filePath = path.join('Invite', '../views/Invite.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `https://frontend-five-gules.vercel.app/login`;
        subject = "Sing up Invitation";
        loads = ({url});
        break;
      case "reset":
        filePath = path.join('Reset', '../views/Reset.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        subject = "Reset password";
        url = `https://frontend-five-gules.vercel.app/resetpassword/`+ info.token;
        loads = ({url});
        break;
      case "wishlist":
        filePath = path.join('Wishlistinvite', '../views/Wishlistinvite.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `https://frontend-five-gules.vercel.app/login`;
        subject = "You have been invited to share a wishlist";
        loads = ({url});
        break;
      case "offers":
        filePath = path.join('Offers', '../views/Offers.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `https://frontend-five-gules.vercel.app/home`;
        subject = "New offers";
        discount = info.discount
        loads = ({url}, {discount})
        break;
      case "confirmOrder":
        filePath = path.join('ConfirmOrder', '../views/ConfirmOrder.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        subject = "Order confirmation";
        loads = ({info})
        break;
      case "shipped":
        filePath = path.join('Shipped', '../views/Shipped.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `https://frontend-five-gules.vercel.app/home`;
        subject = "Account confirmation";
        loads = ({url});
        break;
      case "inProcess":
        filePath = path.join('InProcess', '../views/InProcess.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `https://frontend-five-gules.vercel.app/home`;
        subject = "Account confirmation";
        loads = ({url});
        break;
      case "discount":
        filePath = path.join('Discounts', '../views/Discounts.html');
        source = fs.readFileSync(filePath, 'utf-8').toString();
        template = Handlebars.compile(source);
        url = `https://frontend-five-gules.vercel.app/home`;
        subject = "Discount code";
        discount = info.discount;
        code = info.code;
        loads = ({url, discount, code})
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
