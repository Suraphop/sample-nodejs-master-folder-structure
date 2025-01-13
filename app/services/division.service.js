const DivisionRepository = require("../repositories/division.repository");

class DivisionService {
  async getAllDivision() {
    return await DivisionRepository.getAllDivision();
  }
}

module.exports = new DivisionService();
