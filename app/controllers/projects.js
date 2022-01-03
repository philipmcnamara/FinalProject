"use strict";

const Projects = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add a Project" });
    },
  },
  report: {
    handler: function (request, h) {
      return h.view("report", {
        title: "Projects to Date",
        projects: this.projects,
      });
    },
  },
  project: {
    handler: function (request, h) {
      try {
        let data = request.payload;
        data.owner = this.currentUser;
        this.projects.push(data);
        return h.redirect("/report");
      }
    catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Projects;