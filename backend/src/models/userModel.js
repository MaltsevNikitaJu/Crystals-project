const db = require('../db/connection');

const findUserByEmail = async (email) => {
    return await db('users').where({ email }).first();
  };

const createUser = async (user) => {
    const [newUser] = await db('users').insert(user).returning('*');
    return newUser;
  };

module.exports = {
    findUserByEmail,
    createUser
  };