import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS, QUERY_ME } from '../../utils/queries';

const ProjectForm = () => {
    return (
<div className="col-sm-3">
  <form className="border">
    <div className="form-group">
      <label for="projectTitle">Title</label>
      <input className="form-control" placeholder="Enter your project's title"/>
    </div>
    <div className="form-group">
      <label for="projectDescription">Description</label>
      <input className="form-control" placeholder="Enter a description of your project"/>
    </div>
    <div className="form-group">
      <label for="projectTags">Tags</label>
      <input className="form-control" placeholder="Enter which languages/technologies you would like to tag"/>
    </div>
    <div className="form-group">
      <label for="projectLink">Link</label>
      <input className="form-control" placeholder="Enter a link to your project or project's github"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
    )
}

export default ProjectForm;
