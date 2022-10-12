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
    $link: String!
    $description: String!
    $isFrontEnd: Boolean
    $isBackEnd: Boolean
    $isFullStack: Boolean
  ) {
    addProject(
      title: $title
      link: $link
      description: $description
      isFrontEnd: $isFrontEnd
      isBackEnd: $isBackEnd
      isFullStack: $isFullStack
    ) {
      _id
      title
      link
      description
      isBackEnd
      isFrontEnd
      isFullStack
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
