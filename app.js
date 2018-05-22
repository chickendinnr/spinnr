const express = require("express");
const dotenv = require('dotenv');
const env = require('./env');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const xoath2 = require("xoauth2");

const app = express();

// View engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(__dirname + "/public"));

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/", (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact email</h3>
  <ul>
    <li>Email: ${req.body.email}</li>
  </ul>`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "spinnrapp@gmail.com",
      clientId: env.clientId,
      clientSecret: env.clientSecret,
      refreshToken: env.refreshToken
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Spinnr" <spinnrapp@gmail.com>', // sender address
    to: "spinnrapp@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Thanks for joining our mailing list! Stay tuned for me.", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});

app.listen(3000, () => console.log("Server Running"));
