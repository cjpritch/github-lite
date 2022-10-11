import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
  query projects($username: String) {
    projects(username: $username) {
      _id
      title
      link
      description
      isFrontEnd
      isBackEnd
      isFullStack
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query Project($id: ID!) {
    project(_id: $id) {
      title
      link
      isFrontEnd
      isBackEnd
      isFullStack
    }
  }
`;

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      username
      _id
      projects {
        _id
        title
        link
        isBackEnd
        isFrontEnd
        isFullStack
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      username
      email
      projectCount
      projects {
        _id
        title
        link
        isFullStack
        isFrontEnd
        isBackEnd
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      projectCount
      projects {
        _id
        title
        link
        tags {
          _id
          name
        }
      }
    }
  }
`;
