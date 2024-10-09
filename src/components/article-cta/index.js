import React from "react";
import * as styles from "./styles.module.css";

const ArticleCTA = ({ prefix }) => (
  <section className={styles.cta}>
      <p>{prefix && `${prefix} `}If you'd like to have a chat about working with ustwo or joining our team, head over to <a href="https://ustwo.com">ustwo.com</a></p>
  </section>
);

export default ArticleCTA;
