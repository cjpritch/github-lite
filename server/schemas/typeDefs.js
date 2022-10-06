const { gql } = require('apollo-server-express');
const typeDefs = gql`
type User{
    _id: ID
    username: String
    email: String
    projectCount: Int
    projects: [Project]
}

type Project{
    _id: ID
    title: String
    link: String
    tags: [Tag]
}

type Tag{
    _id: ID
    name: string
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
    
}
`;
module.exports = typeDefs;