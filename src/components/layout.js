import React from "react";
import "../styles/base.css";
import "../styles/global.css";
import Header from "./header";
import Footer from "./footer";
import * as styles from "./layout.module.css";

const Layout = ({ children, type }) => (
  <main>
    <Header />
    {type === "article" ? (
      <article className={styles.article} id="main-content">
        {children}
      </article>
    ) : (
      <div className={styles.article} id="main-content">
        {children}
      </div>
    )}
    <Footer />
  </main>
);

export default Layout;
