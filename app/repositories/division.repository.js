const db = require("../models");
const Division = db.division;

const BaseRepository = require("./base.repository");

class DivisionRepository extends BaseRepository {
  constructor() {
    super(Division); // Pass the model to the base class
  }

  //get Division id by division name
  async getAllDivision() {
    return await Division.findAll();
  }
}

module.exports = new DivisionRepository();
