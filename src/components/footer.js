import React from "react";
import * as styles from "./footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <p>Copyright &copy; ustwo Ltd 2024. All rights reserved. <a href="https://ustwo.com/legal/">Legal</a> | <a href="https://ustwo.com/privacy-policy/">Privacy Policy</a></p>
      <ul className={styles.socials}>
        <li><a href="https://instagram.com/ustwo" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://linkedin.com/company/ustwo-" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://twitter.com/ustwo" target="_blank" rel="noopener noreferrer">X</a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
