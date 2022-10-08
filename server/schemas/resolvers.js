const { User, Project, Tag } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user })
                    .select('-_v -password')
                    .populate('projects')

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('projects');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('projects');
        },
        projects: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Project.find(params);
        },
        //get project by id
        project: async (parent, { _id }) => {
            return Project.findOne({ _id });
        },
        //more queries here.  we need to search by tags
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
                const project = await Project.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { projects: project._id } },
                    { new: true }
                );

                return project;
            }

            throw new AuthenticationError('You need to be logged in');
        },
        createTag: async (parent, name) => {
            const tag = await Tag.create(name);

            return tag;
        },
        addTag: async (parent, { tagName }, context) => {
            console.log(context.user);
            console. log(context.project);
            if (context.user) {
              const updatedProject = await Project.findOneAndUpdate(
                { _id: context.project._id },
                { $addToSet: { tags: tagName } },
                { new: true }
              ).populate('tags');
          
              return updatedProject;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
        //more mutations can go here

    }
};

module.exports = resolvers;