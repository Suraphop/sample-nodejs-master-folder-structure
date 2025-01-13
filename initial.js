const db = require("./app/models");
const Role = db.role;
const Level = db.level;
const Division = db.division;

const initDB = async () => {
  try {
    // Force: true will drop the table if it already exists

    if (process.env.NODE_ENV.trim() === "test") {
      console.log("Running in Test Mode");
      await db.sequelize.sync({ force: true });
    } else {
      await db.sequelize.sync({ force: false });
    }

    await initialDataForTest();
    console.log("Synced db.");
  } catch (err) {
    console.log("Failed to sync db: " + err.message);
  }
};

const initialDataForTest = async () => {
  // Roles
  const count_role = await Role.count();
  if (count_role === 0) {
    Role.create({
      id: 1,
      role: "production",
    });

    Role.create({
      id: 2,
      role: "warehouse",
    });

    // Level
    Level.create({
      id: 1,
      level: "operator",
    });
    Level.create({
      id: 2,
      level: "staff",
    });
    Level.create({
      id: 3,
      level: "admin",
    });

    //division
    Division.create({
      division_id: 1,
      division_name: "abl",
      division_code_as400_short: "FG",
      division_code_as400_full: "T493FG",
    });
    Division.create({
      division_id: 2,
      division_name: "gbl",
      division_code_as400_short: "CH",
      division_code_as400_full: "T493CH",
    });
  }
};

module.exports = initDB;
