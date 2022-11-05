const Bassist = require("../lib/Bassist");

test("Can set model of their bass instrument via constructor", () => {
  const testValue = "UCLA";
  const e = new Bassist("Foo", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Bassist\"", () => {
  const testValue = "Bassist";
  const e = new Bassist("Foo", 1, "test@test.com", "UCLA");
  expect(e.getRole()).toBe(testValue);
});

test("Can get bass model via getBgtrModel()", () => {
  const testValue = "UCLA";
  const e = new Bassist("Foo", 1, "test@test.com", testValue);
  expect(e.getBgtrModel()).toBe(testValue);
});