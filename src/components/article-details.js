import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { format } from "small-date";
import * as styles from "./article-details.module.css";

const ArticleDetails = ({ author, date }) => {
  const { name, role, avatar } = author;
  const avatarImage = getImage(avatar?.childImageSharp?.gatsbyImageData);

  return (
    <div className={styles.authorSection}>
      <GatsbyImage className={styles.avatar} image={avatarImage} alt="" />
      <div className="smallText">
        <p>
          <span className={styles.authorName}>{name}</span>
          <span className={styles.separator}>·</span>
          <span>{role}</span>
        </p>
        <p>
          <span>Published on </span>
          <time dateTime={date}>{format(new Date(date), "MMM dd, yyyy")}</time>
        </p>
      </div>
    </div>
  );
};

export default ArticleDetails;
