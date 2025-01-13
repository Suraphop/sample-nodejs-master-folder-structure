const divisionController = require("../controllers/division.controller");

module.exports = function (app) {
  app.get(
    "/api/v1/division/get_all_division",
    divisionController.getAllDivision
  );
};
