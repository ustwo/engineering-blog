import React from "react";
import { Link } from "gatsby";
import * as styles from "./footer.module.css";

const Footer = () => (
  <footer className={`${styles.footer} smallText`}>
    <div className={styles.inner}>
      <p>Copyright &copy; ustwo Ltd 2024. All rights reserved. <a href="https://ustwo.com/legal/">Legal</a> | <a href="https://ustwo.com/privacy-policy/">Privacy Policy</a></p>
      <ul className={styles.socials}>
        <li><Link to="https://instagram.com/ustwo">Instagram</Link></li>
        <li><Link to="https://linkedin.com/company/ustwo-">LinkedIn</Link></li>
        <li><Link to="https://twitter.com/ustwo">X</Link></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
