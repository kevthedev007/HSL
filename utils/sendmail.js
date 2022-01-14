const api_key = process.env.MAILGUN_APIKEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });


function sendMail(email, username, password) {
  const data = {
    from: 'HSL <healthservicelifestyle@gmail.com>',
    to: email,
    subject: 'Login Details',
    html: `<h1>Login Details</h1>
          <p>Hello ${email}, your login details are provided below: </p>
          <h2>username: ${username}</h2>
          <h2>password: ${password}</h2>
          `
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) return console.log(error.message)
    console.log("mail sent");
  });

}

module.exports = { sendMail }