import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { format } from "small-date";
import tagify from "../utils/tagify";
import * as styles from "./article-card.module.css";

const ArticleCard = ({ name, title, description, date, thumbnail, tags, empty }) => {
  let thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData);

  if (!empty) {
    return (
      <article className={styles.articleCard} aria-labelledby={title}>
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <h2 className={styles.title} id={title}>
              <Link className={styles.link} to={`/articles/${name}`}>{title}</Link>
            </h2>
            <time className={styles.date} dateTime={date}>{format(new Date(date), "dd MMM, yyyy")}</time>
            <p className={styles.description}>{description}</p>
          </header>
          {tags && (
            <ul className={styles.tags} aria-label="Article tags">
              {tagify(tags).map(tag => <li key={`${title} ${tag}`} aria-label={tag}>{tag}</li>)}
            </ul>
          )}
        </div>
        <GatsbyImage className={styles.thumbnail} image={thumbnailImage} alt="" aria-hidden="true" />
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
