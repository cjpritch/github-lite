const { User, Project } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
     
      if (context.user) {
        const userData = await User.findOne({ email: context.user.email })
          .select('-_v -password')
          .populate('projects');

        return userData;
      } else throw new AuthenticationError('Not logged in');
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
      console.log(`\n\n\n\n\n\n`)
      console.log(username)
      const params = username ? { username } : {};
      let projectData = await User.findOne(params.email).populate('projects').sort({ createdAt: -1 })
      console.log(`\n\n\nprojectData\n\n\n`)
      console.log(projectData)
      return projectData;;
    },
    //get project by id
    project: async (parent, { _id }) => {
      return Project.findOne({ _id });
    },
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
    deleteProject: async (parent, { _id }, context) => {
      if (context.user) {
        await Project.findByIdAndDelete({ _id: _id });
        return;
      }
    },
  },
};

module.exports = resolvers;