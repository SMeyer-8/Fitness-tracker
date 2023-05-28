const client = require("../client");

async function createUser({ username, password }) {
    const {
      rows: [user],
    } = await client.query(
      `

        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
    `,
      [username, password]
    );
     return user;
}

//This code may be optional to get all users from the data base
async function getAllUsers() {
  const {rows}  = await client.query(`
  SELECT * FROM users;
  `);
  return rows;
  }

async function getUserById(id) {
  const {
    rows: [user],
  } = await client.query(
    `

    select username from users where id = $1;
  `,
    [id]
  );
   return user;
}

async function getUserByUsername(username) {
  const {
    rows: [user],
  } = await client.query(
    `

    select * from users where username = $1;
  `,
    [username]
  );
   return user;
}

module.exports = { createUser, getAllUsers, getUserById, getUserByUsername};