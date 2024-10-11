import React from "react";
import LogoUstwo from "../../assets/icons/logo-ustwo";
import * as styles from "./styles.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <ul className={styles.company}>
        <li className={styles.logo}><a href="https://ustwo.com/" aria-label="ustwo home"><LogoUstwo /></a><span> &copy; 2024</span></li>
        <li><a href="https://ustwo.com/legal/">Legal</a></li>
        <li><a href="https://ustwo.com/privacy-policy/">Privacy Policy</a></li>
      </ul>
      <ul className={styles.socials}>
        <li><a href="https://instagram.com/ustwo" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://linkedin.com/company/ustwo-" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://twitter.com/ustwo" target="_blank" rel="noopener noreferrer">X</a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
