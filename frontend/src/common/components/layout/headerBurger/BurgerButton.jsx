import styles from '../Header.module.css';

export default function BurgerButton({ open, onToggle }) {
  return (
    <button
      type="button"
      className={`${styles['icon-btn']} ${styles['icon-burger']}`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onToggle}   
    />
  );
}