import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import { QUERY_PROJECTS } from '../utils/queries';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  return (
    <main>
      <div className="container">
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
