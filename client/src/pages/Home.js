import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import TagList from '../components/TagList';
import { QUERY_PROJECTS } from '../utils/queries';
export default Home;

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  function filterProducts() {
    if (!currentTag) {
    

return projects.filter((project) => project.tag._id === currentTag); }


  return (
    <main>
      <div className="container">
        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectList projects={projects} title="" />
            // <TagList/>
          )}
        </div>
      </div>
    </main>
  );
};
};

// need to have list of projects and list of tags both on the home page
// and be able to filter the projects by the tag
