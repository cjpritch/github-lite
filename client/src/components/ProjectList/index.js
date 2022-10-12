import React from 'react';
import { Link } from 'react-router-dom';

// display all projects in a list
const ProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Posted Yet</h3>;
  }

  return (
    <div className="border col-sm-9">
      <h3>{title}</h3>
      {projects &&
        projects.map((project) => (
          <div>
            <div key={project._id} className="card mb-3">
              <Link to={`/project/${project._id}`}>
                <p className="card-header">{project.title}</p>
              </Link>
              <div className="card-body">
                <p className="mb-0">{project.link}</p>
                <p className="mb-0">{project.description}</p>
                <p className="mb-0">{project.isFrontEnd}</p>
                <p className="mb-0">{project.isBackEnd}</p>
                <p className="mb-0">{project.isFullStack}</p>
                <Link to={`/profile/${project.username}`}>
                  <p className="mb-0">{project.username}</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
