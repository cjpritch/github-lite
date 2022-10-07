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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// we may need to add description into the typedefs schema for project
export const ADD_PROJECT = gql`
  mutation addProject($title: String!, $link: String!, $description: String!) {
    addProject(title: $title, link: $link, description: $description) {
      _id
      title
      link
      username
      tags {
        _id
        name
      }
    }
  }
`;

export const ADD_TAG = gql`
  mutation addTag($name: String!) {
    addTag(name: $name) {
      _id
      name
    }
  }
`;

// We may want to create a new mutation for deleting project posts
// export const REMOVE_PROJECT = gql`
//   mutation removeProject($title: String!, $link: String!, $description: String!) {
//     removeProject(title: $title, link: $link, description: $description) {
//      _id
//       title
//       link
//     }
//   }
// `;
