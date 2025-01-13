const db = require("../models");
const Authentication = db.authenication;
const Role = db.role;
const Division = db.division;
const Level = db.level;

const BaseRepository = require("./base.repository");

class AuthenticationRepository extends BaseRepository {
  constructor() {
    super(Authentication); // Pass the model to the base class
  }

  //get id by emp no
  async getIDByEmpNo(emp_no) {
    return await Authentication.findOne({
      attributes: ["auth_id"],
      where: { emp_no: emp_no },
      raw: true,
    });
  }

  //get Email by email
  async getEmail(email) {
    return await Authentication.findOne({
      attributes: ["email"],
      where: { email: email },
      raw: true,
    });
  }

  //get password by emp no
  async getPasswordByEmpNo(emp_no) {
    return await Authentication.findOne({
      attributes: ["password"],
      where: { emp_no: emp_no },
      raw: true,
    });
  }
  //get role by emp no
  async getRoleByEmpNo(emp_no) {
    return await Authentication.findOne({
      attributes: ["Role.role"],
      where: { emp_no: emp_no },
      raw: true,
      include: {
        model: Role,
        attributes: ["role"],
      },
    });
  }

  //get lebel by emp no
  async getLevelByEmpNo(emp_no) {
    return await Authentication.findOne({
      attributes: ["Level.level"],
      where: { emp_no: emp_no },
      raw: true,
      include: {
        model: Level,
        attributes: ["level"],
      },
    });
  }

  //delete with auth id
  async delete(id) {
    return await this.model.destroy({
      where: {
        auth_id: id,
      },
    });
  }

  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: Role,
          attributes: ["role"],
        },
        {
          model: Division,
          attributes: ["division_code_as400_full"],
        },
        {
          model: Level,
          attributes: ["level"],
        },
      ],
    });
  }
}

module.exports = new AuthenticationRepository();
