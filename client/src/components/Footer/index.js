import React from 'react';

// display at bottom of page, never changes
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>&copy; Github Lite {currentYear}</div>
    </footer>
  );
};

export default Footer;
