const AutheniticationController = require("../controllers/authentication.controller");
const JWT = require("../middlewares/jwt");

module.exports = function (app) {
  app.post("/api/v1/authen/signup", AutheniticationController.signUp);
  app.post("/api/v1/authen/login", AutheniticationController.logIn);
  app.put(
    "/api/v1/authen/assign_role",
    JWT.verifyToken,
    JWT.isWarehouse,
    AutheniticationController.assignRole
  );
  app.put(
    "/api/v1/authen/accept_signup",
    JWT.verifyToken,
    JWT.isWarehouse,
    AutheniticationController.acceptSignup
  );
  app.put(
    "/api/v1/authen/change_password",
    AutheniticationController.changePassword
  );
  app.delete(
    "/api/v1/authen/delete_account",
    JWT.verifyToken,
    JWT.isWarehouse,
    AutheniticationController.deleteAccount
  );
  app.get(
    "/api/v1/authen/get_all_account",
    JWT.verifyToken,
    JWT.isWarehouse,
    AutheniticationController.getAllAccount
  );
};
