import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>&copy; Github Lite {currentYear}</div>
    </footer>
  );
};

export default Footer;

// display at bottom of page, never changes
