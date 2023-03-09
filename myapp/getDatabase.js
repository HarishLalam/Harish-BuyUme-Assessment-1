const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const databasePath = path.join(__dirname, "inventory.db");

let database = null;
const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    return database;
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
  }
};

module.exports = initializeDbAndServer;
