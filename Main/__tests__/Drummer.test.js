const Drummer = require("../lib/Drummer");

test("Can set drum stick type via constructor", () => {
  const testValue = "DrmSticks";
  const e = new Drummer("Foo", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Drummer\"", () => {
  const testValue = "Drummer";
  const e = new Drummer("Foo", 1, "test@test.com", "GitHubUser");
  expect(e.getRole()).toBe(testValue);
});

test("Can get type of their drum sticks via getDrmSticks()", () => {
  const testValue = "GitHubUser";
  const e = new Drummer("Foo", 1, "test@test.com", testValue);
  expect(e.getDrmSticks()).toBe(testValue);
});