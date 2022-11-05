const Employee = require("./Employee");

class Drummer extends Employee {
  constructor(name, id, email, drmSticks) {
    super(name, id, email);
    this.drmSticks = drmSticks;
  }

  getRole() {
    return "Drummer";
  }

  getDrmSticks() {
    return this.drmSticks;
  }

}

module.exports = Drummer;