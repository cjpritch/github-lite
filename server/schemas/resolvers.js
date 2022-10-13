const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');
 
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('projects')
          .populate('contacts');
 
        return userData;
      }
 
      throw new AuthenticationError('Not logged in');
    },
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params).sort({ createdAt: -1 });
    },
    project: async (parent, { _id }) => {
      return Project.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('contacts')
        .populate('projects');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('contacts')
        .populate('projects');
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
 
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { projectId, commentBody }, context) => {
      if (context.user) {
        const updatedProject = await Project.findOneAndUpdate(
          { _id: projectId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
 
        return updatedProject;
      }
 
      throw new AuthenticationError('You need to be logged in!');
    },
    addContact: async (parent, { contactId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { contacts: contactId } },
          { new: true }
        ).populate('contacts');
 
        return updatedUser;
      }
 
      throw new AuthenticationError('You need to be logged in!');
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
