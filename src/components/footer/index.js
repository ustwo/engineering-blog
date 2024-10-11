import React from "react";
import LogoUstwo from "../../assets/icons/logo-ustwo";
import * as styles from "./styles.module.css";
import SocialMediaLinkIcons from "../social-media-link-icon";

const contactInfo = [
  {
    platform: "instagram",
    url: "https://instagram.com/ustwo",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/company/ustwo-",
  },
  {
    platform: "x",
    url: "https://twitter.com/ustwo",
  },
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <ul className={styles.company}>
        <li className={styles.logo}><a href="https://ustwo.com/" aria-label="ustwo home"><LogoUstwo /></a><span> &copy; 2024</span></li>
        <li><a href="https://ustwo.com/legal/">Legal</a></li>
        <li><a href="https://ustwo.com/privacy-policy/">Privacy Policy</a></li>
      </ul>
      <SocialMediaLinkIcons platforms={contactInfo} size="small"/>    
    </div>
  </footer>
);

export default Footer;
