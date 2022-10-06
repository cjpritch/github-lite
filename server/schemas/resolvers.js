const { User, Project } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user })
                    .select('-_v -password')
                    .populate('projects')
                    
                    return userData;
            }
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
    }
}