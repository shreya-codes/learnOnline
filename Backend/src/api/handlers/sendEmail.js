import nodeMailer from "nodemailer";

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PW,
  },
});

const sendMail = (receiver, subject, htmlContent) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject: subject,
    html: htmlContent
    // `<div>Click the link to change password <a href=${url}>Click Here</a></div>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendMail;
