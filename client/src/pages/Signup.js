import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// some of the functionality may change depending on if we use react bootstrap or not for the form
const Signup = () => {
  const [formState, setFormState] = useState({
        username: '',
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

    return ();
};

export default Signup;