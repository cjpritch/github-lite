import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../utils/queries';

// if you click on a project desciption it will bring you to that single project's page
const SingleProject = () => {
    const { id: projectId } = useParams();

    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { id: projectId },
      });

    const project = data?.project || {};
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        
        <div class="border col-sm-9">
        <div>
            <div class="card mb-3">
              <p class="card-header">{project.title}</p>
              <div class="card-body">
                <p class="mb-0">{project.description}</p>
                <p class="mb-0">{project.link}</p>
                <p className="mb-0">{project.isFrontEnd}</p>
                <p className="mb-0">{project.isBackEnd}</p>
                <p className="mb-0">{project.isFullStack}</p>
              </div>
            </div>
        </div>
        </div>
    );
}

export default SingleProject;