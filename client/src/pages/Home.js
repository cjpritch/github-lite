import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import { QUERY_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="container">
      {loggedIn && (
          <div className="row">
            <ProjectForm />
          </div>
           )}
        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectList projects={projects} title="Most Recent Posts" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

// need to have list of projects and list of tags both on the home page
// and be able to filter the projects by the tag
