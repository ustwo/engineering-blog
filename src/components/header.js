import React from "react";
import { Link } from "gatsby";
import LogoUstwo from "../assets/images/logo-ustwo";
import * as styles from "./header.module.css";

const Header = () => (
  <header className={styles.header}>
    <nav>
      <Link to="/" className={styles.homeLink}>
        <LogoUstwo className={styles.logo} />
        <span>_engineering</span>
      </Link>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
