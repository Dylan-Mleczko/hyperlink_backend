import { connect, clearDatabase, closeDatabase } from './db_test_helper';

/**
 * connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connect();
  console.log('beforeAll');
});

/**
 * clear all test data after every test.
 */
afterEach(async () => {
  await clearDatabase();
  console.log('afterEach');
});

/**
 * Remove and close the db and server after running all tests.
 */
afterAll(async () => {
  await closeDatabase();
  console.log('afterAll');
});
