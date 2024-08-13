import React from "react";
import { Link } from "gatsby";
import * as styles from "./footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <p>Copyright © ustwo Ltd 2024. All rights reserved. <a href="https://ustwo.com/legal/">Legal</a> | <a href="https://ustwo.com/privacy-policy/">Privacy Policy</a></p>
      <Link to="https://instagram.com/ustwo">Instagram</Link>
      <Link to="https://linkedin.com/company/ustwo-">LinkedIn</Link>
      <Link to="https://twitter.com/ustwo">X</Link>
    </div>
  </footer>
);

export default Footer;
