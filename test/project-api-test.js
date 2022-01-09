"use strict";

const assert = require("chai").assert;
const ProjectService = require("./project-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let projects = fixtures.projects;
  let newProject = fixtures.projects;

  const projectService = new ProjectService(fixtures.ProjectService);

  setup(async function () {
    await projectService.deleteAllProjects();
  });

  teardown(async function () {
    await projectService.deleteAllProjects();
  });

  test("create a Project", async function () {
    const returnedProject = await projectService.createProject(newProject);
    assert.isDefined(returnedProject._id);
  });

  test("get Project", async function () {
    const u1 = await projectService.createProject(newProject);
    const u2 = await projectService.getProject(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("get invalid Project", async function () {
    const u1 = await projectService.getProject("1234");
    assert.isNull(u1);
    const u2 = await projectService.getProject("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete a Project", async function () {
    let u = await projectService.createProject(newProject);
    assert(u._id != null);
    await projectService.deleteOneProject(u._id);
    u = await projectService.getProject(u._id);
    assert(u == null);
  });

  test("get all Projects", async function () {
    for (let u of projects) {
      await projectService.createProject(u);
    }

    const allProjects = await projectService.getProjects();
    assert.equal(allProjects.length, projects.length);
  });

  test("get Project detail", async function () {
    for (let u of projects) {
      await projectService.createProject(u);
    }

    const allProjects = await projectService.getProjects();
    for (var i = 0; i < projects.length; i++) {
      assert(_.some([allProjects[i]], projects[i]), "returned Review must be a superset of newUser");
    }
  });

  test("get all empty Projects", async function () {
    const allProjects = await projectService.getProjects();
    assert.equal(allProjects.length, 0);
  });
});
