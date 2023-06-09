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

async function updateRoutineActivity({ routineActivityId, count, duration }) {
    const {
        rows: [routineActivity],
    } = await client.query(
        `
          update routineactivities
          set count = $2, duration = $3 
          where id = $1;
      `,
        [routineActivityId, count, duration]
    );
    return routineActivity;
}

async function destroyRoutineActivity(routineActivityId) {
    const {
        rows: [routineActivity],
    } = await client.query(
        `
          delete from routineactivities
          where id = $1;
      `,
        [routineActivityId]
    );
    return routineActivity;
}

async function getRoutineActivitiesByRoutine(routineId) {
    const {
        rows: [routineActivity],
    } = await client.query(
        `
          select * from routineactivities where routine_id = $1;
      `,
        [routineId]
    );
    return routineActivity;
}

module.exports = { getRoutineActivitiesByRoutine, destroyRoutineActivity, updateRoutineActivity, getRoutineActivityById, addActivityToRoutine }