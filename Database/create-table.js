const db = require("./db");

// user_id VARCHAR(255) NOT NULL PRIMARY KEY,
const usersTable = `CREATE TABLE IF NOT EXISTS "users_table"(
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);`;

async function createTables() {
  try {
    const tables = await db.many(
      "SELECT table_name FROM information_schema.tables"
    );

    // get all table name
    const data = await Promise.all([
      createUsersTable()
    ]);

    //Check whether user table already exists or not

    async function createUsersTable() {
      const checkUsersTable = tables.filter(
        (name) => name.table_name === "users_table"
      );

      if (!checkUsersTable[0]) {
        await db.none(usersTable);
        return "Users Table created Successfully";
      } else {
        return "Users table already exist";
      }
    }
    return data;
  } catch (error) {
    return error.message;
  }
};

module.exports = createTables;
