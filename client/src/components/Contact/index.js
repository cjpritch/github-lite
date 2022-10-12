import React from 'react';

const Contact = () => {
  const user = data?.me || data?.user || {};

  return (
    <div class="border col-sm-3">
      <div>
        <div class="card mb-3">
          <p class="card-header">Meet the Developer:</p>
          <div class="card-body">
            <p class="mb-0">
              <p>{user.name}</p>
            </p>
            <p class="mb-0">
              <p>{user.email}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
