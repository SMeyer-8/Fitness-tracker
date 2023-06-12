const client = require("../client");

async function createActivity({ name, description }) {
    const {
        rows: [activity],
    } = await client.query(
        `
          INSERT INTO activities(name, description)
          VALUES ($1, $2)
          RETURNING *;
      `,
        [name, description]
    );
    return activity;
}

async function getActivityById(id) {
    const {
        rows: [activity],
    } = await client.query(
        `
        select * from activities a
        where a.id = $1;
      `,
        [id]
    );
    return activity;
}

async function getAllActivities() {
    const {rows} = await client.query(
        `
        select * from activities
      `
    );
    return rows;
}

async function updateActivity({ activityId, name, description }) {
    const {
        rows: [activity],
    } = await client.query(
        `
        update activites a
        set name = $2, description = $3
        where a.id = $1;
      `,
        [activityId, name, description]
    );
    return activity;
}

    async function deleteActivityById(id) {}

module.exports = { updateActivity, getAllActivities, getActivityById, createActivity }