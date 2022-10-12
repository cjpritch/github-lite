import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// some of the functionality may change depending on if we use react bootstrap or not for the form
const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label for="signupUsername" className="form-label">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="signupUsername" className="form-label">
            Full name
          </label>
          <input
            type="username"
            className="form-control"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="signupEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="signupPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">
          Sign Up
        </button>
        {error && <div>Sign up failed</div>}
      </form>
    </main>
  );
};

export default Signup;
