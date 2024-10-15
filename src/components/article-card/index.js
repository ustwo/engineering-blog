import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { format } from "small-date";
import tagify from "../../utils/tagify";
import * as styles from "./styles.module.css";
import * as constants from "../../utils/constants";

const ArticleCard = ({ slug, title, description, series_title, series_number, date, thumbnail, tags, empty }) => {
  const thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData);

  const [hovered, setHover] = useState(false);
  const toggleHover = () => setHover(prev => !prev);

  const isSeries = series_title && series_number;
  
  if (!empty) {
    return (
      <article
        className={`${styles.articleCard} ${hovered ? styles.hovered : ""} ${isSeries ? styles.articleInSeries : ""}`}
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
            {isSeries && <h4 className={styles.subtitle}>Part {series_number} of {series_title}</h4>}
            <time className={styles.date} dateTime={date}>{format(new Date(date), constants.blog_date_format)}</time>
            <p className={styles.description}>{description}</p>
          </header>
          {tags && (
            <ul className={styles.tags} aria-label="Article tags">
              {tagify(tags).map(tag => <li key={`${title}-${tag}`}>{tag}</li>)}
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
