const mailer = require("nodemailer");

module.exports = {
    mailer: async () => {
        let testAccount = mailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = mailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'thyroi0208@gmail.com', // generated ethereal user
                pass:  'arenasdeltiempo' // generated ethereal password
            },
        });
        let hola = transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "juan-salgado@upc.edu.co, llam.agustin@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "hola soy juan, funciona?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", mailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return info.messageId
    }
};
