import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// some of the functionality may change depending on if we use react bootstrap or not for the form
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
<form>
    <div className="mb-3">
      <label for="loginEmail" className="form-label">Email address</label>
      <input type="email" className="form-control"/>
    </div>
    <div className="mb-3">
      <label for="loginPassword" className="form-label">Password</label>
      <input type="password" className="form-control"/>
    </div>
    <button type="submit" className="btn">Login</button>
</form>
    );
};

export default Login;