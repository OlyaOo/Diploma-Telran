import React from 'react';
import Title from '../ui/title';
import InstagramIcon from '../../../assets/icons/instagram.svg?react';
import WhatsappIcon from '../../../assets/icons/whatsapp.svg?react';
import styles from './Footer.module.css';

const Footer = () => {
  const phoneNumber = '+49 999 999 99 99';
  const cleanPhoneNumber = phoneNumber.replace(/\s/g, '');
  const address = 'Linkstraße 2, 8 OG, 10785, Berlin, Deutschland';
  const workingHours = '24 hours a day';

  return (
    <footer className={styles.footer}>
      <Title text="Contact" />
      <div className={styles['contact-grid']}>
        <div className={styles['footer-phone']}>
          <p className={styles['contact-label']}>Phone</p>
          <a href={`tel:${cleanPhoneNumber}`}>{phoneNumber}</a>
        </div>
        <div className={styles['footer-socials']}>
          <p className={styles['contact-label']}>Socials</p>
          <div className={styles['social-icons']}>
            <InstagramIcon className={styles['social-icon']} />
            <WhatsappIcon className={styles['social-icon']} />
          </div>
        </div>
        <div className={styles['footer-address']}>
          <p className={styles['contact-label']}>Address</p>
          <p>{address}</p>
        </div>
        <div className={styles['footer-hours']}>
          <p className={styles['contact-label']}>Working Hours</p>
          <p>{workingHours}</p>
        </div>
      </div>
      <div className={styles['map-container']}>
        <iframe
          src="https://www.google.com/maps?q=Starta Institute by Tel-Ran,%2010785%20Berlin&z=16&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;