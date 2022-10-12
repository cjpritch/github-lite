import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
  query AllProjects {
    allProjects {
      title
      link
      description
      isFrontEnd
      isBackEnd
      isFullStack
    }
  }
`;

export const QUERY_PROJECT = gql`
  query Project($id: ID!) {
    project(_id: $id) {
      title
      link
      description
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
        description
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
        description
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
    name
    email
  }
}
`;
