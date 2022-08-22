module.exports = {
  debug: false,
  logger: {
    logLevel: "debug",
  },
  server: {
    name: "Test Web", port: process.env.PORT || 3000
  },
  db: {
    name: "MongoDB",
    uri: "mongodb://localhost:27017/itProject",
  },
  secrets: {
    jwtPrivateKey: "unsecureKey",
  },
  testing: {
     user: {
      login: {
        email: "test@test.io",
        password: "password"
      }
    },
    db: {
      uri: process.env.MONGO_URL
    }
  },
};
