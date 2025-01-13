const DivisionService = require("../services/division.service");

class DivisionController {
  //get all division
  async getAllDivision(req, res) {
      return res.status(200).json({ result: await DivisionService.getAllDivision() });
  }
}
module.exports = new DivisionController();
