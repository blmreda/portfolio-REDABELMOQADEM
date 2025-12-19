const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { 
      user: process.env.EMAIL_USER || process.env.SMTP_USER, 
      pass: process.env.EMAIL_PASS || process.env.SMTP_PASS 
    },
    logger: true, // logs détaillés
    debug: true,  // affichage du protocole SMTP
  });
  

transporter.verify((err, success) => {
  if (err) console.error("❌ SMTP Error:", err);
  else console.log("✅ SMTP prêt à envoyer les emails");
});

module.exports = transporter;