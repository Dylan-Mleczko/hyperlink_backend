module.exports = {
  debug: false,
  logger: {
    logLevel: 'debug',
  },
  sendgrid:{
    sendgridApiKey: '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',
    senderEmail: 'jaiswalk@student.unimelb.edu.au',
  },
  server: {
    name: 'Development Web',
    port: process.env.PORT || 3001,
  },
  db: {
    name: 'Local MongoDB',
    uri: 'mongodb+srv://hyperlink:dktkl3001@cluster0.vufvthw.mongodb.net/?retryWrites=true&w=majority',
  },
  secrets: {
    jwtPrivateKey: 'unsecureKey',
  },
  test: {
    db: {
      name: 'MongoDB',
      uri: 'mongodb+srv://hyperlink:dktkl3001@cluster0.vufvthw.mongodb.net/?retryWrites=true&w=majority',
    },
  },
};
