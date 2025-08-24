import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode.js';
import styles from "./Header.module.css";
import logo from '../../../assets/icons/logo.svg';
import { useState } from 'react';
import { navLinks } from './headerBurger/navLinks.js';
import DesktopNav from './headerBurger/DesktopNav.jsx';
import BurgerButton from './headerBurger/BurgerButton.jsx';
import MobileDrawer from './headerBurger/MobileDrawer.jsx';


export default function Header() {
  const [theme, toggleTheme] = useDarkMode();
  const isDark = theme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles['header-grid']}`}>
        <div className={styles['header-left']}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" height={70} />
          </div>

          <button
            type="button"
            className={styles.switch}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={isDark}
          >
            <span className={styles['switch__knob']} />
          </button>
        </div>

        <div className={styles['header-center']}>
          <button className={styles['discount-btn']} type="button">1 day discount!</button>
          <DesktopNav links={navLinks} />
        </div>

        <div className={styles['header-right']}>
          <Link to="/favorites" className={`${styles['icon-btn']} ${styles['icon-heart']}`} aria-label="Favorites" />
          <Link to="/cart" className={`${styles['icon-btn']} ${styles['icon-cart']}`} aria-label="Cart" />
          <BurgerButton open={menuOpen} onToggle={() => setMenuOpen(v => !v)} /> 
        </div>
      </div>

      {/* ВНЕ сетки: off-canvas для мобилок */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        showDiscount={true}
      />
    </header>
  );
}

