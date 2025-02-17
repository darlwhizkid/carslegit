const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: 'noreply@carslegit.com',
    subject: 'Verify your CarsLegit account',
    html: `
      <h1>Welcome to CarsLegit!</h1>
      <p>Click the link below to verify your account:</p>
      <a href="https://carslegit.vercel.app/verify/${verificationToken}">Verify Account</a>
    `
  };
  
  await sgMail.send(msg);
};

module.exports = { sendVerificationEmail };