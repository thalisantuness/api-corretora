const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
        user: "cardial.i.t.gestao@gmail.com",
        pass: "svlfmqkqrbvtahal"
    }
});

module.exports = transporter ;