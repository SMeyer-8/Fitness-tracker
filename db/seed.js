const client = require("./client");
const { createUser } = require("./adapters/users");
const { createRoutine } = require("./adapters/routines");
const { createActivity } = require("./adapters/activities");
const { addActivityToRoutine } = require("./adapters/routine_activities");
const { users, routines, activities, routineActivities } = require("./seedData");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`DROP TABLE IF EXISTS routineactivities;`);
    await client.query(`DROP TABLE IF EXISTS activities;`);
    await client.query(`DROP TABLE IF EXISTS routines;`);
    await client.query(`DROP TABLE IF EXISTS users;`);
    
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    await client.query(`
      create table routines (
        id serial primary key,
        creator_id integer references users(id),
        is_public boolean default false,
        name varchar(255) unique not null,
        goal text not null
      )
    `);

    await client.query(`
      create table activities (
        id serial primary key,
        name varchar(255) unique not null,
        description text not null
      )
    `);

    await client.query(`
      create table routineactivities (
        id serial primary key,
        routine_id integer references routines(id),
        activity_id integer references activities(id),
        duration integer,
        count integer,
        unique (routine_id, activity_id)
      )
    `);

  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    for (const user of users) {
      const createdUser = await createUser(user);
      console.log("User: ", createdUser);
    }

    for (const routine of routines) {
      const createdRoutine = await createRoutine(routine);
      console.log("Routine: ", createdRoutine);
    }

    for (const activity of activities) {
      const createdActivity = await createActivity(activity);
      console.log("Actitivity: ", createdActivity);
    }

    for (const routineActivity of routineActivities) {
      const createdActivity = await addActivityToRoutine(routineActivity);
      console.log("Routine Activity: ", createdActivity);
    }
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();