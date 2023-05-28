const client = require("../client");

async function addActivityToRoutine({ routineId, activityId, duration, count }) {
    const {
        rows: [routineActivity],
    } = await client.query(
        `
          INSERT INTO routineactivities(routine_id, activity_id, duration, count)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
      `,
        [routineId, activityId, duration, count]
    );
    return routineActivity;
}

async function getRoutineActivityById(routineActivityId) {
    const {
        rows: [routineActivity],
    } = await client.query(
        `
          select * from routineactivities where id = $1;
      `,
        [routineActivityId]
    );
    return routineActivity;
}

module.exports = { getRoutineActivityById, addActivityToRoutine }