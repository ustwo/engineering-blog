import React from "react";
import { Link } from "gatsby";
import LogoUstwo from "../assets/images/logo-ustwo";
import * as styles from "./header.module.css";

const Header = () => (
  <header className={styles.header}>
    <a href="#main-content" className={`${styles.skipLink} smallText`}>Skip to content</a>
    <nav aria-label="Main navigation">
      <Link to="/" className={styles.homeLink} aria-label="Ustwo Engineering Home">
        <LogoUstwo className={styles.logo} aria-hidden="true" />
        <span>_engineering</span>
      </Link>
    </nav>
  </header>
);

export default Header;
