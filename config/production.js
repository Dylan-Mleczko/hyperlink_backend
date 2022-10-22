module.exports = {
  debug: false,
  logger: {
    logLevel: 'debug',
  },
  server: {
    name: 'HyperLink',
    port: process.env.PORT || 3001,
  },
  sendgrid:{
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    senderEmail: process.env.SENDEREMAIL,
  },
  db: {
    name: 'Local MongoDB',
    uri: 'mongodb+srv://hyperlink:dktkl3001@cluster0.vufvthw.mongodb.net/?retryWrites=true&w=majority',
  },
  secrets: {
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  },
  test: {
    db: {
      name: 'MongoDB',
      uri: 'mongodb+srv://hyperlink:dktkl3001@cluster0.vufvthw.mongodb.net/?retryWrites=true&w=majority',
    },
  },
};
