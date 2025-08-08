import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode.js';

const Header = () => {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <header>
      <nav>
        <Link to="/">Main Page</Link> |{' '}
        <Link to="/categories">Categories</Link> |{' '}
        <Link to="/products">All products</Link> |{' '}
        <Link to="/sales">All sales</Link>
      </nav>
      <button onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
    </header>
  );
};

export default Header;
