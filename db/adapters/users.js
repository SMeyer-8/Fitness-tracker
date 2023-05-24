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


module.exports = { createUser, getAllUsers };