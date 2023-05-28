const client = require("../client");

async function getRoutineById(id) {
    const {
        rows: [routine],
    } = await client.query(
        `
        select * from routines r
        inner join routineactivities ra on r.id = ra.routine_id
        inner join activities a on ra.activity_id = a.id
        where r.id = $1;
      `,
        [id]
    );
    return routine;
}

async function getAllRoutines() {
    const [rows] = await client.query(`
        select * from routines r
        inner join routineactivities ra on r.id = ra.routine_id
        inner join activities a on ra.activity_id = a.id;
    `);
    return rows;
}

async function getRoutinesWithoutActivities() {
    const [rows] = await client.query(`
        select * from routines r
        left outer join routineactivities ra on r.id = ra.routine_id
        where ra.id is null;
    `);
    return rows;
}

async function getAllPublicRoutines() {
    const [rows] = await client.query(`
        select * from routines r
        inner join routineactivities ra on r.id = ra.routine_id
        inner join activities a on ra.activity_id = a.id
        where r.is_public = true
    `);
    return rows;
}

async function getAllRoutinesByUser(username) {
    const [rows] = await client.query(`
        select r.*, a.* from routines r
        inner join routineactivities ra on r.id = ra.routine_id
        inner join activities a on ra.activity_id = a.id
        inner join users u on u.id = r.creator_id
        where u.username = $1`,
        [username]);
    return rows;
}

async function getPublicRoutinesByUser(username) {
    const [rows] = await client.query(`
        select r.*, ra.*, a.* from routines r
        inner join routineactivities ra on r.id = ra.routine_id
        inner join activities a on ra.activity_id = a.id
        inner join users u on u.id = r.creator_id
        where u.username = $1 and r.is_public = true`,
        [username]);
    return rows;
}

async function getPublicRoutinesByActivity(activityId) {
    const [rows] = await client.query(`
        select r.*, ra.*, a.* from routines r
        inner join routineactivities ra on r.id = ra.routine_id
        inner join activities a on ra.activity_id = a.id
        inner join users u on u.id = r.creator_id
        where a.id = $1`,
        [activityId]);
    return rows;
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
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

async function updateRoutine({ routineId, isPublic, name, goal }) {
    const {
        rows: [routine],
    } = await client.query(
        `
        update routines
        set is_public = $2, name = $3, goal = $4
        where id = $1
      `,
        [routineId, isPublic, name, goal]
    );
    return routine;
}


async function destoryRoutine(routineId) {
    const {
        rows: [routine],
    } = await client.query(
        `
        delete from routineactivities where routine_id = $1;
        delete from routines where id = $1;
      `,
        [routineId]
    );
    return routine;
}


module.exports = { destoryRoutine, updateRoutine, getPublicRoutinesByActivity, getPublicRoutinesByUser, getAllRoutinesByUser, createRoutine, getAllRoutines, getRoutineById, getRoutinesWithoutActivities, getAllPublicRoutines }