const { User, Project } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user })
          .select('-_v -password')
          .populate('projects');

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    // get all users
    users: async () => {
      return User.find().select('-__v -password').populate('projects');
    },
    //get a single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('projects');
    },
    //get all of a users projects
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      let projectData = await User.findOne(params).populate('projects');

      return projectData;
    },
    //get project by id
    project: async (parent, { _id }) => {
      return Project.findOne({ _id });
    },

    //get all of the projects on the site
    allProjects: async () => {
      return Project.find();
    },

    //more queries can go here.
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addProject: async (parent, args, context) => {
      if (context.user) {
        // const project = new Project({
        //     title: args.title,
        //     description: args.description,
        //     link: args.link,
        //     isFrontEnd: args.isFrontEnd,
        //     isBackEnd: args.isBackEnd,
        //     isFullStack: args.isFullStack
        // }).save();// MongoDB saving

        const project = await Project.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { projects: project._id } },
          { new: true }
        );

        return project;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    editProject: async (parent, { _id, ProjectInput }, context) => {
      if (context.user) {
        const updatedProject = await Project.findOneAndUpdate(
          { _id: _id },
          { ProjectInput }
        );
        return updatedProject;
      }
    },

    deleteProject: async (parent, { _id }, context) => {
      if (context.user) {
        await Project.findByIdAndDelete({ _id: _id });
        return;
      }
    },
    //more mutations can go here
  },
};

module.exports = resolvers;
