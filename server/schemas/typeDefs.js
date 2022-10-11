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
    description: String
    isFrontEnd: Boolean
    isBackEnd: Boolean
    isFullStack: Boolean
}

type Auth {
    token: ID!
    user: User
}

input ProjectInput {
    title: String
    link: String
    description: String
    isFrontEnd: Boolean
    isBackEnd: Boolean
    isFullStack: Boolean
}

type Query {
    me: User

    users: [User]

    user(username: String!): User

    projects(username: String!): User

    project(_id: ID!): Project

    allProjects: [Project]
    
}

type Mutation {
    addUser(username: String!, name: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    addProject(title: String!, link: String!, description: String!, isFrontEnd: Boolean, isBackEnd: Boolean, isFullStack: Boolean): Project

    # save this mutation until we can search done with all queries
    # editProject(_id: ID!, ProjectInput: ProjectInput!): Project

}
`;
module.exports = typeDefs;