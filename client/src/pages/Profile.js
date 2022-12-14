import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam, fullname: userParam },
  });
  const loggedIn = Auth.loggedIn();
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <main>
      <ProjectList
        projects={user.projects}
        title={`${user.username}'s projects!`}
      />
      <div>          <h2>Contact:</h2>
          <p>{user.fullname}</p>
          <p>{user.email}</p></div>
      <div>{!userParam && <ProjectForm />}</div>
    </main>
  );
};

export default Profile;
