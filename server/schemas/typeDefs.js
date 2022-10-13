// import the gql tagged template function
const { gql } = require('apollo-server-express');
 
// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    fullname: String
    email: String
    contactCount: Int
    projects: [Project]
    contacts: [User]
  }
 
  type Project {
    _id: ID
    title: String
    description: String
    link: String
    tag: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }
 
  type Comment {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
 
  type Auth {
    token: ID!
    user: User
  }
 
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    projects(username: String): [Project]
    project(_id: ID!): Project
  }
 
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      fullname: String!
      email: String!
      password: String!
    ): Auth
    addProject(
      title: String!
      description: String!
      link: String!
      tag: String!
    ): Thought
    addComment(thoughtId: ID!, commentBody: String!): Thought
    addContact(contactId: ID!): User
    deleteThought(_id: ID!): User
  }
`;
 
// export the typeDefs
module.exports = typeDefs;
