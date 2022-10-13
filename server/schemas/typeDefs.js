const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    fullname: String
    email: String
    projectCount: Int
    projects: [Project]
  }
  type Project {
    _id: ID
    title: String
    description: String
    tag: String
    link: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input ProjectInput {
    title: String
    description: String
    tag: String
    link: String
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    projects(username: String!): [Project]
    project(_id: ID!): Project
  }
  type Mutation {
    addUser(
      username: String!
      fullname: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addProject(
      title: String!
      description: String!
      tag: String!
      link: String!
    ): Project
    deleteProject(_id: ID!): User
  }
`;
module.exports = typeDefs;
