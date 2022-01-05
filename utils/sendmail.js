const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});


function sendMail(email, username, password) {
    let mailTransport = {
        from: '"HSL" <hslservice@gmail.com>',
        to: email, // list of receivers
        subject: "Login Details", // Subject line
        html: `<h1>Login Details</h1>
            <p>Hello ${email}, your login details are provided below: </p>
             <h2>username: ${username}</h2>
             <h2>password: ${password}</h2>
            `
    };

    transporter.sendMail(mailTransport, (error, info) => {
        if (error) return console.log(error.message)
        console.log("mail sent")
    });
}


module.exports = { sendMail }