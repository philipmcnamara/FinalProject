"use strict";

const assert = require("chai").assert;
const ProjectService = require("./project-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Project API tests", function () {
  let projects = fixtures.projects;
  let newProject = fixtures.projects;

  const projectService = new ProjectService(fixtures.ProjectService);

  setup(async function () {
    await projectService.deleteAllProjects();
  });

  teardown(async function () {
    await projectService.deleteAllProjects();
  });


  test("get invalid Project", async function () {
    const u1 = await projectService.getProject("1234");
    assert.isNull(u1);
    const u2 = await projectService.getProject("012345678901234567890123");
    assert.isNull(u2);
  });

});
