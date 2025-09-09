import React from 'react';

const Title = ({ text, className = "" }) => {
  return <h2 className={`section-title ${className}`}>{text}</h2>;
};

export default Title;