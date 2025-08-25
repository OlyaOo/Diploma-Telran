import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  return (
    <nav aria-label="breadcrumb">
      <ol>
        {paths.length !== 0 && (
          <li><Link to="/">Home</Link></li>
        )}
        {paths.map((segment, idx) => {
          const url = '/' + paths.slice(0, idx + 1).join('/');
          return (
            <li key={url}>
              <Link to={url}>{segment}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
