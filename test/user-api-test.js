"use strict";

const assert = require("chai").assert;
const ProjectService = require("./project-service");
const fixtures = require("./fixtures.json");


suite("User API tests", function () {


  const projectService = new ProjectService(fixtures.ProjectService);

  setup(async function () {
    await projectService.deleteAllUsers();
  });

  teardown(async function () {
    await projectService.deleteAllUsers();
  });



  test("get invalid user", async function () {
    const u1 = await projectService.getUser("1234");
    assert.isNull(u1);
    const u2 = await projectService.getUser("012345678901234567890123");
    assert.isNull(u2);
  });

});
