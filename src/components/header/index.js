import React from "react";
import { Link } from "gatsby";
import LogoUstwo from "../../assets/images/logo-ustwo";
import * as styles from "./styles.module.css";

const Header = () => (
  <header className={styles.header}>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <nav aria-label="Main navigation">
      <Link className={styles.homeLink} to="/" aria-label="ustwo engineering blog home">
        <LogoUstwo className={styles.logo} aria-hidden="true" />
        <span>Engineering Blog</span>
      </Link>
      <ul className={`smallText ${styles.links}`}>
        <li><Link to="/about">About</Link></li> 
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
