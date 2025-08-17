import React from 'react';
import Title from '../ui/title';
import InstagramIcon from '../../../assets/icons/instagram.svg?react';
import WhatsappIcon from '../../../assets/icons/whatsapp.svg?react';

const Footer = () => {
  const phoneNumber = '+49 999 999 99 99';
  const cleanPhoneNumber = phoneNumber.replace(/\s/g, '');
  const address = 'Linkstraße 2, 8 OG, 10785, Berlin, Deutschland';
  const workingHours = '24 hours a day';

  return (
    <footer className="footer">
      <Title text="Contact" />
      <div className="contact-grid">
        <div className="footer-phone">
          <p className="contact-label">Phone</p>
          <a href={`tel:${cleanPhoneNumber}`}>{phoneNumber}</a>
        </div>
        <div className="footer-socials">
          <p className="contact-label">Socials</p>
          <div className="social-icons">
            <InstagramIcon className="social-icon" />
            <WhatsappIcon className="social-icon" />
          </div>
        </div>
        <div className="footer-address">
          <p className="contact-label">Address</p>
          <p>{address}</p>
        </div>
        <div className="footer-hours">
          <p className="contact-label">Working Hours</p>
          <p>{workingHours}</p>
        </div>
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps?q=Starta Institute by Tel-Ran,%2010785%20Berlin&z=16&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;