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
          owner: user._id,
          problemDefinition: data.problemDefinition,
          goals: data.goals,
          rootCause: data.rootCause,
          man: data.man,
          method: data.method,
          machine: data.machine,
          environment: data.environment,
          measurement: data.measurement,
          material: data.material,
          actionPlan: data.actionPlan
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
        //  const project = await Project.findById(id).lean();
        console.log("test 1");
        //console.log(id,project);
        return h.view("displayProject", { title: title,});
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
        const problemDefinition = project.problemDefinition;
        const goals = project.goals;
        const rootCause = project.rootCause;
        const man = project.man;
        const method = project.method;
        const machine = project.machine;
        const environment = project.environment;
        const measurement = project.measurement;
        const material = project.material;
        const actionPlan = project.actionPlan;
        const actionPlanString = actionPlan.toString()
        const splitActionPlan = [];
        let i = 0;
        const fullArray = actionPlanString.split(',');
        let counter = 0;
        // loop through whole array, /6 because there are 6 columns in the table
        for(i = 0; i < fullArray.length/6; i++)
        {
          //clears tempArray every loop so rows get added to the table
          const tempArray = [];
          for(var j = 0; j < 6; j++){
            tempArray[j] = fullArray[counter];
            console.log("counter  : " + counter);
            console.log("j  : " + j);
            counter++;
          }
          //add the values to each row on every loop
          splitActionPlan.push(tempArray);
        }
        return h.view("displayProject", { title: title, id: id, background: background, problemDefinition: problemDefinition, goals: goals, rootCause: rootCause, man: man, machine: machine, method: method,environment: environment,  measurement: measurement,  material: material,  splitActionPlan: splitActionPlan});
      } catch (err) {
        return h.view("displayProject", { errors: [{ message: err.message }] });
      }
    },
  },

  UpdateProject: {
    validate: {
      payload: {
        title: Joi.string().required(),
        background: Joi.string().required(),
        problemDefinition: Joi.string().required(),
        goals: Joi.string().required(),
        id: Joi.string().required(),
        man: Joi.string().required(),
        machine: Joi.string().required(),
        method : Joi.string().required(),
        environment : Joi.string().required(),
        measurement : Joi.string().required(),
        material : Joi.string().required(),
        actionPlan: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("displayProject", {
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
        const problemDefinition = collection.problemDefinition;
        const goals = collection.goals;
        const man = collection.man;
        const machine = collection.machine;
        const method = collection.method;
        const environment = collection.environment;
        const measurement = collection.measurement;
        const material = collection.material;
        const actionPlan = collection.actionPlan;
        const record = await Project.findById(id);
        console.log("Title: "+collection.title);
        record.title = title;
        record.background = background;
        record.problemDefinition = problemDefinition;
        record.goals = goals;
        record.machine = machine;
        record.method = method;
        record.environment = environment
        record.measurement = measurement;
        record.material = material;
        record.man = man;
        record.actionPlan = actionPlan;
        await record.save();
        return h.view("report", { title: title, id: id, background: background, problemDefinition: problemDefinition, goals: goals, man: man, machine: machine, method: method,environment: environment,  measurement: measurement,  material: material, actionPlan: actionPlan });
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  deleteProject: {
    validate: {
      payload: {
        title: Joi.string().required(),
        background: Joi.string().required(),
        id: Joi.string().required(),
        problemDefinition: Joi.string().required(),
        goals: Joi.string().required(),
        man: Joi.string().required(),
        machine: Joi.string().required(),
        method : Joi.string().required(),
        environment : Joi.string().required(),
        measurement : Joi.string().required(),
        material : Joi.string().required(),
        actionPlan: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("displayProject", {
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
        const problemDefinition = collection.problemDefinition;
        const goals = collection.goals;
        const man = collection.man;
        const machine = collection.machine;
        const method = collection.method;
        const environment = collection.environment;
        const measurement = collection.measurement;
        const material = collection.material;
        const actionPlan = collection.actionPlan;
        console.log("test Project update "+id);
        const record = await Project.findById(id);
        console.log("Title: "+collection.title);
        record.title = title;
        record.background = background;
        await record.delete();
        return h.view("home", { title: title, id: id, background: background, problemDefinition: problemDefinition, goals: goals , man: man, machine: machine, method: method,environment: environment,  measurement: measurement,  material: material,  actionPlan: actionPlan });
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    },
  },

};
module.exports = Projects;