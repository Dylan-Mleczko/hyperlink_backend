import ramda from 'ramda';
import config from 'config';
import mongoose from 'mongoose';

export const connect = async (connectDbUri, connOptions = {}) => {
  const dbUri = connectDbUri || config.db.uri;
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 25, // Maintain up to 25 socket connections
    minPoolSize: 5, // The minimum number of sockets will keep open for this connection
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  const conn = mongoose.connection;
  const connOpts = ramda.mergeAll(options, connOptions);
  // Connection Events
  conn.on('connecting', () => {
    console.log('Database is connecting ...');
  });
  conn.on('connected', () => {
    console.log(`Database connected to ${conn.host}:${conn.port}/${conn.name}`);
    // console.log(`${config.db.name} connected to ${conn.host}:${conn.port}/${conn.name}`);
  });
  conn.on('disconnecting', () => {
    console.log('Database is disconnecting ...');
  });
  conn.on('disconnected', () => {
    console.log('Database disconnected');
  });
  conn.on('close', () => {
    console.log('Database connection closed');
  });
  conn.on('reconnected', () => {
    console.log(`Database reconnected to ${conn.host}:${conn.port}/${conn.name}`);
  });
  conn.on('reconnectFailed', () => {
    console.log('Database reconnect Failed ');
  });
  conn.on('error', () => {
    console.log('Database connect error');
  });
  await mongoose.connect(dbUri, connOpts);
  return conn;
};

export const disconnect = async (conn) => {
  if (conn) await conn.close();
  else await mongoose.connection.close();
  console.log('Database disconnected');
};

// export default { disconnect, connect };
