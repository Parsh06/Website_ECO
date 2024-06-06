// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/api/contact', async (req, res) => {
//   const { name, email, phone, concern, feedback } = req.body;

//   // Validate received data
//   if (!name || !email || !phone || !concern || !feedback) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     // Create a transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER, // Replace with your email
//         pass: process.env.EMAIL_PASS, // Replace with your email password
//       },
//     });

//     // Set email options
//     let mailOptions = {
//       from: process.env.EMAIL_USER, // Replace with your email
//       to: 'admin-email@example.com', // Replace with admin email
//       subject: 'New Contact Form Submission',
//       html: `
//         <h3>Contact Form Submission</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Concern:</strong> ${concern}</p>
//         <p><strong>Feedback:</strong> ${feedback} stars</p>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Message sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Failed to send message' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
