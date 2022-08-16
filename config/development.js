module.exports = {
  debug: false,
  logger: {
    logLevel: 'debug',
  },
  server: {
    name: 'Development Web',
    port: process.env.PORT || 3001,
  },
  db: {
    name: 'Local MongoDB',
    uri: 'mongodb+srv://kelsey:l4RsWg5l6clO5LZN@devop.othyzkx.mongodb.net/?retryWrites=true&w=majority',
  },
  secrets: {
    jwtPrivateKey: 'unsecureKey',
    requiresAuth: true,
  },
  test: {
    db: {
      name: 'MongoDB',
      uri: 'mongodb+srv://kelsey:l4RsWg5l6clO5LZN@devop.othyzkx.mongodb.net/?retryWrites=true&w=majority',
    },
  },
};
