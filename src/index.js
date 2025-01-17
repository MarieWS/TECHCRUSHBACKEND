const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Configure Nodemailer (replace with your actual credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 465,
  secure: true,
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password' 
  }
});

// Example API route
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'your_email@gmail.com', 
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
