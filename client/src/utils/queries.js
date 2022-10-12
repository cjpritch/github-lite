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
`;

export const QUERY_PROJECT = gql`
  query project($id: ID!) {
    project(_id: $id) {
      _id
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
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      fullname
      email
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
  query users {
    users {
      username
      fullname
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
    fullname
    email
  }
}
`;
