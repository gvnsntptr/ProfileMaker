const Employee = require("./Employee");

class Bassist extends Employee {
  constructor(name, id, email, bgtrBass) {
    super(name, id, email);
    this.bgtrBass = bgtrBass;
  }

  getRole() {
    return "Bassist";
  }

  getModelOfBass() {
    return this.bgtrBass;
  }

}

module.exports = Bassist;