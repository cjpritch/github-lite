import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../utils/queries';

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
              <p class="card-header">Name of Project</p>
              <div class="card-body">
                  <p class="mb-0">About the project here</p>
              </div>
            </div>
        </div>
        </div>
    );
}

export default SingleProject;