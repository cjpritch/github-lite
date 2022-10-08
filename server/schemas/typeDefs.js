const { gql } = require('apollo-server-express');
const typeDefs = gql`
type User{
    _id: ID
    username: String
    email: String
    projectCount: Int
    projects: [Project]
}

type Tag{
    _id: ID!
    name: String
}

type Project{
    _id: ID
    title: String
    link: String
    tags: [Tag]
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
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, link: String!, description: String!): Project
    addTag(name: String!): Tag
}
`;
module.exports = typeDefs;