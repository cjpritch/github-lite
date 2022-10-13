import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $fullname: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      fullname: $fullname
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $title: String!
    $description: String!
    $tag: String!
    $link: String!
  ) {
    addProject(
      title: $title
      description: $description
      tag: $tag
      link: $link
    ) {
      _id
      title
      description
      tag
      link
      createdAt
      username
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(_id: $id) {
      projectCount
      projects {
        title
      }
    }
  }
`;
