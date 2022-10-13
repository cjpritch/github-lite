import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// need a username, a fullname for contact info, an email, and a password
const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    fullname: '',
    email: '',
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
          <label for="signupUsername" className="form-label text-white">
            Username
          </label>
          <input
            name="username"
            type="username"
            id="username"
            className="form-control"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="signupUsername" className="form-label text-white">
            Full name
          </label>
          <input
           name="fullname"
           type="fullname"
           id="fullname"
            className="form-control"
            value={formState.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="signupEmail" className="form-label text-white">
            Email address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="form-control"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="signupPassword" className="form-label text-white">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
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
