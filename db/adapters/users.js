const client = require("../client");

async function createUser({ username, password }) {
    const {
        rows: [user], 
    } = await client.query(`

        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ONCONFLICT (username) DO NOTHING
        RETURNING *;
    `,
     [username, password]
     );
     return user;
}

module.exports = { createUser };