import React from "react";
import * as styles from "./article-cta.module.css";

const ArticleCTA = ({prefix}) => {
  if(prefix){
    prefix += " ";
  }

  return (
    <section className={styles.cta}>
        <p>{prefix}If you'd like to have a chat about working with ustwo or joining our team, head over to <a href="https://ustwo.com">ustwo.com</a></p>
    </section>
  );
}

export default ArticleCTA;
