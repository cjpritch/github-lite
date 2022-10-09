import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS, QUERY_ME } from '../../utils/queries';

const ProjectForm = () => {
  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.project, addProject] } },
        });
      } catch (e) {
        console.warn('First project insertion by user!');
      }

      // update thought array's cache
      const { project } = cache.readQuery({ query: QUERY_PROJECTS });
      cache.writeQuery({
        query: QUERY_PROJECTS,
        data: { projects: [addProject, ...projects] },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add project to database
      await addProject({
        variables: { projectText },
      });
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
            placeholder="Enter your project's title"
          />
        </div>
        <div className="form-group">
          <label for="projectDescription">Description</label>
          <input
            className="form-control"
            placeholder="Enter a description of your project"
          />
        </div>
        <div className="form-group">
          <label for="projectTags">Tags</label>
          <input
            className="form-control"
            placeholder="Enter which languages/technologies you would like to tag"
          />
        </div>
        <div className="form-group">
          <label for="projectLink">Link</label>
          <input
            className="form-control"
            placeholder="Enter a link to your project or project's github"
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

// For form: we need title, link, description, image, and tag
// get tag options from tag list

// this will display on the user profile page
// if a user is logged in then they can see the posts they've made
// plus a form to the right to make a new post
