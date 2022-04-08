const nodemailer = require("nodemailer");
  // create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'llamagustin', // generated ethereal user
      pass: 'lirhybpsimqkifmw' // generated ethereal password
    },
  });

  transporter.verify().then(()=>{
      console.log('Success')
  })

  module.exports = transporter;