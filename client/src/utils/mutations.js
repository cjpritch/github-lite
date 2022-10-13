import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
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

export const ADD_CONTACT = gql`
  mutation addContact($id: ID!) {
    addContact(contactId: $id) {
      _id
      username
      contactCount
      contacts {
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
    $link: String!
    $tag: String!
  ) {
    addThought(
      title: $title
      description: $description
      link: $link
      tag: $tag
    ) {
      _id
      title
      description
      link
      tag
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($projectId: ID!, $commentBody: String!) {
    addComment(projectId: $projectId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(_id: $id) {
      projects {
        title
      }
    }
  }
`;
