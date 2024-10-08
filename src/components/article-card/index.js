import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { format } from "small-date";
import tagify from "../../utils/tagify";
import * as styles from "./styles.module.css";

const ArticleCard = ({ slug, title, description, date, thumbnail, tags, empty }) => {
  const thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData);

  const [hovered, setHover] = useState(false);
  const toggleHover = () => setHover(prev => !prev);

  if (!empty) {
    return (
      <article
        className={`${styles.articleCard} ${hovered ? styles.hovered : ""}`}
        aria-labelledby={slug}
      >
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <h2 className={styles.title} id={slug}>
              <Link
                className={styles.link}
                to={slug}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
              >
                {title}
              </Link>
            </h2>
            <time className={styles.date} dateTime={date}>{format(new Date(date), "dd MMM, yyyy")}</time>
            <p className={styles.description}>{description}</p>
          </header>
          {tags && (
            <ul className={styles.tags} aria-label="Article tags">
              {tagify(tags).map(tag => <li key={`${title} ${tag}`}>{tag}</li>)}
            </ul>
          )}
        </div>
        <div className={styles.thumbnailWrapper}>
          <GatsbyImage className={styles.thumbnail} image={thumbnailImage} alt="" aria-hidden="true" />
        </div>
      </article>
    );
  }

  return (
    <div>
      <div className={styles.emptyThumbnail} />
      <div className={styles.emptyDate} />
      <div className={styles.emptyTitle} />
      <div className={styles.emptyDescription} />
    </div>
  );
}

export default ArticleCard;
