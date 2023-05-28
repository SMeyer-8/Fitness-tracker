const client = require("../client");

async function createRoutine(creatorId, isPublic, name, goal) {
    const {
        rows: [routine],
      } = await client.query(
        `
  
          INSERT INTO routines(creator_id, is_public, name, goal)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
      `,
        [creatorId, isPublic, name, goal]
      );
       return routine;
}

module.exports = { createRoutine }