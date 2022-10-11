import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $name: String!, $password: String!, $email: String!){
  addUser(username: $username , name: $name, password: $password , email: $email) {
    token
    user{
    _id
    username
    email
    }
  }
`;

// we may need to add description into the typedefs schema for project
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
      title
      link
      _id
      isBackEnd
      isFrontEnd
      isFullStack
    }
  }
`;
