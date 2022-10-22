import sendGridMail from '@sendgrid/mail';
// import { env } from '../../environment';
import config from 'config';

sendGridMail.setApiKey(config.sendgrid.sendgridApiKey);
// const PORT = config.server.port;

const setUrl = (email) => {
  return `http://localhost:3000/password/end/reset?email=${email}`;
};

const getMessage = (email) => {
  return {
    to: email,
    from: config.sendgrid.senderEmail,
    subject: 'Password Reset',
    text: `To reset your password kindly click on this link \n ${setUrl(email)}`,
  };
};

export const sendEmail = async (email) => {
  try {
    await sendGridMail.send(getMessage(email));
    console.log('Forgot password email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
  }
};
