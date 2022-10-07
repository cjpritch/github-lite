import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
  query projects($username: String) {
    projects(username: $username) {
      _id
      title
      link
      tags {
        _id
        name
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query project($id: ID!) {
    project(_id: $id) {
      _id
      title
      link
      tags {
        _id
        name
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      projectCount
      projects {
        _id
        title
        link
        tags {
          _id: ID
          name
        }
      }
    }
  }
`;

// type Query {
//     me: User
//     users: [User]
//     user(username: String!): User
//     projects(username: String): [Project]
//     project(_id: ID!): Project

// }
