"use strict";
const Project = require("../models/project");
const User = require("../models/user");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");

const Projects = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add a Project" });
    },
  },
  report: {
    handler: async function(request, h) {
      const projects = await Project.find().populate("owner").lean();
      return h.view("report", {
        title: "Projects to Date",
        projects: projects,
      });
    },
  },
  project: {
    handler: async function (request, h) {
      try {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newProject = new Project({
        title: data.title,
        background: data.background,
        owner: user._id
      });
      await newProject.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },

  showProject: {
    handler: async function(request, h) {
      try {
        console.log("test showproject");
        //  const poi = await Project.findById(id).lean();
        console.log("test 1");
        //console.log(id,project);
        return h.view("displayProject", { title: "Testing",});
      }
      catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },

  Project: {
    validate: {
      payload: {
        id: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("displayProject", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const collection = request.payload;
        const id = collection.id
        console.log("Project Id : "+id);
        const project = await Project.findById(id);
        const title = project.title;
        const background = project.background;
        return h.view("displayProject", { title: "Testing", id: id, background: background,  });
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  UpdateProject: {
    validate: {
      payload: {
        title: Joi.string().required(),
        background: Joi.string().required(),
        id: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("displayPOI", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const collection = request.payload;
        const id = collection.id
        const title = collection.title;
        const background = collection.background;
        const record = await POI.findById(id);
        console.log("Title: "+collection.title);
        record.title = title;
        record.background = background;
        await record.save();
        return h.view("displayProject", { title: "Testing", id: id, background: background,  });
        // return h.redirect("/displayPOI",{id:id});
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  deletePOI: {
    validate: {
      payload: {
        title: Joi.string().required(),
        background: Joi.string().required(),
        id: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("displayPOI", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const collection = request.payload;
        const id = collection.id
        const title = collection.title;
        const background = collection.background;
        console.log("test Project update "+id);
        const record = await Project.findById(id);
        console.log("Title: "+collection.title);
        record.title = title;
        record.background = background;
        await record.delete();
        return h.view("displayProject", { title: "Testing", id: id, background: background,  });
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

};
module.exports = Projects;