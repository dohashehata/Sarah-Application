import nodemailer from 'nodemailer';

const EMAIL = 'dohashehata7@gmail.com';
const EMAIL_PASSWORD = 'omozehsqwlpajgko';

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL, 
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

export default sendEmail;
