import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

// only need email and password to login
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label
            for="loginEmail"
            name="email"
            type="email"
            id="email"
            className="form-label text-white"
          >
            Email address
          </label>
          <input
          type="email"
          name="email"
          type="email"
          id="email"
          className="form-control"
          value={formState.email}
          onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label
            for="loginPassword"
            className="form-label text-white"
          >
            Password
          </label>
          <input
          type="password"
          name="password"
          type="password"
          id="password"
          className="form-control" 
          value={formState.password}
          onChange={handleChange}/>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      {error && <div>Login failed</div>}
    </main>
  );
};

export default Login;
