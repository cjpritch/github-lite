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

    return ();
}

export default SingleProject;