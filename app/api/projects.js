"use strict";

const Project = require("../models/project");
const Boom = require("@hapi/boom");

const projects = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const projects = await Project.find();
      return projects;
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const projects = await Project.findOne({ _id: request.params.id });
        if (!projects) {
          return Boom.notFound("No projects with this id");
        }
        return projects;
      } catch (err) {
        return Boom.notFound("No projects with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const newProject = new Project(request.payload);
      const project = await newProject.save();
      if (project) {
        return h.response(project).code(201);
      }
      return Boom.badImplementation("error creating project");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Project.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const project = await Project.deleteOne({ _id: request.params.id });
      if (project) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = projects;