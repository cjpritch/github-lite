import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS, QUERY_ME } from '../../utils/queries';

const ProjectForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    isFrontEnd: '',
    isBackEnd: '',
    isFullStack: '',
  });

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, projects: [...me.project, addProject] } },
        });
      } catch (e) {
        console.warn('First project insertion by user!');
      }

      // update project array's cache
      const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
      cache.writeQuery({
        query: QUERY_PROJECTS,
        data: { projects: [addProject, ...projects] },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add project to database
      await addProject({
        variables: { ...formState },
      });

      // clear form value
      setFormState({ title: '',
      description: '',
      isFrontEnd: '',
      isBackEnd: '',
      isFullStack: '', });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="col-sm-3">
      <form className="border" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label for="projectTitle">Title</label>
          <input
            className="form-control"
            value={formState.title}
            placeholder="Enter your project's title"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="projectDescription">Description</label>
          <input
            value={formState.description}
            className="form-control"
            placeholder="Enter a description of your project"
            onChange={handleChange}
          />
        </div>
        <select class="form-select" aria-label="project-type">
          <option selected>Select a Project Type</option>
          <option value={formState.isFrontEnd} onChange={handleChange}>Frontend</option>
          <option value={formState.isBackEnd} onChange={handleChange}>Backend</option>
          <option value={formState.isFullStack} onChange={handleChange}>Full Stack</option>
        </select>
        <div className="form-group">
          <label for="projectLink">Link</label>
          <input
            className="form-control"
            value={formState.link}
            placeholder="Enter a link to your project"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;

// For form: we need title, link, description, and tag
// get tag options from tag list

// this will display on the user profile page
// if a user is logged in then they can see the posts they've made
// plus a form to the right to make a new post
