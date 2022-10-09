import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Posted Yet</h3>;
  }

  return (
    <div className="border col-sm-9">
    <h3>Most Recent Posts</h3>
        <div>
            <div className="card mb-3">
              <p className="card-header">Name of Project</p>
              <div className="card-body">
                  <p className="mb-0">About the project here</p>
              </div>
            </div>
      </div>
</div>
      );
};

export default ProjectList;
