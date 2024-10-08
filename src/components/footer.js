import React from "react";
import * as styles from "./footer.module.css";
import LogoUstwo from "../assets/images/logo-ustwo";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <ul className={styles.company}>
        <li><a href="https://ustwo.com/"><LogoUstwo aria-hidden="true" /></a><span> &copy; 2024</span></li>
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
