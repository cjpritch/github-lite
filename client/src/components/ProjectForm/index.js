import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS, QUERY_ME } from '../../utils/queries';

const ProjectForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    tag: '',
    link: '',
  });
  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, projects: me.projects?[...me.projects, addProject]:[addProject] } },
        });console.log("Put something in cache")
          // update project array's cache
      console.log("starting to populate")
      const { projects } = cache.readQuery({ query: (QUERY_PROJECTS, {variables: {username: me.username}}) });
      console.log(projects)
      cache.writeQuery({
        query: QUERY_PROJECTS,
        data: { projects: [addProject, ...projects] },
      });
      } catch (e) {
        console.warn('Error');
      }

    
      
    },
  });

  //const [addProject, { error }] = useMutation(ADD_PROJECT);

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
        variables: {...formState},
      });
      // clear form value
      setFormState({ title: '', description: '', tag: '', link: '' });
    } catch (e) {
      console.error(error);
    }
  };

  return (
    <div className="col-sm-3">
      <form className="border" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label for="projectTitle" className="text-white">Title</label>
          <input
            className="form-control"
            placeholder="Enter your project's title"
            name="title"
            type="title"
            id="title"
            value={formState.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="projectDescription" className="text-white">Description</label>
          <input
            className="form-control form-input"
            placeholder="Enter a description of your project"
            name="description"
            type="description"
            id="description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="projectTag" className="text-white">List the technologies you used</label>
          <input
            className="form-control form-input"
            placeholder="Enter a your project's technologies"
            name="tag"
            type="tag"
            id="tag"
            value={formState.tag}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="projectLink" className="text-white">Link</label>
          <input
            className="form-control form-input"
            placeholder="Enter a link to your project"
            name="link"
            type="link"
            id="link"
            value={formState.link}
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
