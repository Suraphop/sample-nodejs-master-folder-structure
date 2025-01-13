const bcrypt = require("bcrypt");

class AuthenticationDataCleaner {
  //prepare data for sign up
  async prepareSignup(data) {
    const data_clean = {
      emp_no: data.emp_no.toLowerCase(),
      password: bcrypt.hashSync(data.password, bcrypt.genSaltSync()),
      email: data.email,
      division_id: data.division_id,
      role_id: data.role_id,
      level_id: data.level_id,
    };

    return data_clean;
  }
  //prepare data for login
  async prepareLogin(data) {
    const data_clean = {
      emp_no: data.emp_no.toLowerCase(),
    };

    return data_clean;
  }

  //prepare data for change password
  async prepareChangePassword(data) {
    const data_clean = {
      emp_no: data.emp_no.toLowerCase(),
      new_password: bcrypt.hashSync(data.new_password, bcrypt.genSaltSync()),
    };

    return data_clean;
  }
}

module.exports = new AuthenticationDataCleaner();
