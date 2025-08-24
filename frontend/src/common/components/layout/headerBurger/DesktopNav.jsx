import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

export default function DesktopNav({ links }) {
  return (
    <nav className={styles.nav}>
      {links.map((l) => (
        <Link key={l.to} to={l.to}>{l.label}</Link>
      ))}
    </nav>
  );
}