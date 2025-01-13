const dbConfig = require("../config/db.config.js");
const process = require("process");
const dotenv = require("dotenv");

const envFile = `.env.${process.env.NODE_ENV}`.trim();
dotenv.config({ path: envFile});

//connect db
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
  }
);

//initial db config
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//create table
db.apiPath = require("./apiPath.model.js")(sequelize, Sequelize);
db.as400TransactionLog = require("./as400TransactionLog.model.js")(
  sequelize,
  Sequelize
);
db.authenication = require("./authentication.js")(sequelize, Sequelize);
db.division = require("./division.model.js")(sequelize, Sequelize);
db.inventoryArea = require("./inventoryArea.model.js")(sequelize, Sequelize);
db.job = require("./job.model.js")(sequelize, Sequelize);
db.jobLog = require("./jobLog.model.js")(sequelize, Sequelize);
db.jobStatus = require("./jobStatus.model.js")(sequelize, Sequelize);
db.level = require("./level.model.js")(sequelize, Sequelize);
db.mrRequest = require("./mrRequest.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.productLog = require("./productLog.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.unitPrice = require("./unitPrice.model.js")(sequelize, Sequelize);

//relationship
dbConfig.CreateAssociationOneToMany(db.authenication, db.role, "role_id");
dbConfig.CreateAssociationOneToMany(db.authenication, db.level, "level_id");
dbConfig.CreateAssociationOneToMany(
  db.authenication,
  db.division,
  "division_id"
);
dbConfig.CreateAssociationOneToMany(db.product, db.division, "division_id");
dbConfig.CreateAssociationOneToMany(db.productLog, db.product, "product_id");
dbConfig.CreateAssociationOneToMany(
  db.inventoryArea,
  db.division,
  "division_id"
);
dbConfig.CreateAssociationOneToMany(db.unitPrice, db.division, "division_id");
dbConfig.CreateAssociationOneToMany(db.job, db.product, "product_id");
dbConfig.CreateAssociationOneToMany(
  db.job,
  db.inventoryArea,
  "inventory_area_id"
);
dbConfig.CreateAssociationOneToMany(db.job, db.jobStatus, "job_status_id");
dbConfig.CreateAssociationOneToMany(db.job, db.mrRequest, "mr_request_id");
dbConfig.CreateAssociationOneToMany(db.jobLog, db.job, "job_id");
dbConfig.CreateAssociationOneToMany(db.mrRequest, db.division, "division_id");

module.exports = db;
