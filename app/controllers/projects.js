"use strict";
const Project = require("../models/project");
const User = require("../models/user");

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
    },
  },
};

module.exports = Projects;