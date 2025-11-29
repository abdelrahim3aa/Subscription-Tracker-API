import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const sendHelloEmail = async (to, subject, templateData) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'templates', 'helloEmailTemplate.html');
  let htmlTemplate = fs.readFileSync(filePath, 'utf8');

  // Replace template variables
  htmlTemplate = htmlTemplate
  .replace('{{name}}', templateData.name || '')
  .replace('{{subscriptionName}}', templateData.subscriptionName || '')
  .replace('{{renewalDate}}', templateData.renewalDate || '')
  .replace('{{manageLink}}', templateData.manageLink || '#');


  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SubTrack" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlTemplate,
  });

  console.log('Email sent successfully');
};

export default sendHelloEmail;
