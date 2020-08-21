require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async(visitInfo) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anthony.mercado300@gmail.com',
        pass: process.env.GMAILPASS
    }
  })

  let info = await transporter.sendMail({
    from: 'Anthony Mercado <anthony.mercado300@gmail.com>',
    to: 'anthonymercado9000@gmail.com',
    subject: 'Visitor Parking',
    text: 'Hello,\n\nI am requesting a guest pass for ${date}. My name is Anthony Mercado and my guest name is ${name} and their vehicle is a ${color} ${make} ${model}. The license plate on the vehicle is ${LCM4930}.',
  })

  console.log('Message sent: ', info.messageId);
}

export default sendEmail;