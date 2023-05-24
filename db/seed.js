const client = require("./client");

async function dropTables(){
    console.log("Dropping tables...");
}

async function createTables(){
    console.log("Creating tables...");
}

async function populateTables(){
    console.log("Populating tables...");
}

async function rebuildDb(){
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