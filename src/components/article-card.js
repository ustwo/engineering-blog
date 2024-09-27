import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { format } from "small-date";
import tagify from "../utils/tagify";
import * as styles from "./article-card.module.css";

const ArticleCard = ({ name, title, date, thumbnail, thumbnailAlt, tags, empty }) => {
  let thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData);

  if (!empty) {
    return (
      <Link to={`/articles/${name}`} className={styles.articleCard} aria-label={title}>
        <article>
          <GatsbyImage image={thumbnailImage} className={styles.thumbnail} alt={thumbnailAlt || ""} />
          <header>
            <time dateTime={date} className={`${styles.date} smallText`}>{format(new Date(date), "dd MMM, yyyy")}</time>
            <h2 id={title} className="h4">{title}</h2>
            {tags && (
              <ul className={`${styles.tags} smallText`} aria-label="Article tags">
                {tagify(tags).map(tag => <li key={`${title} ${tag}`} aria-label={`Tag: ${tag}`}>{tag}</li>)}
              </ul>
            )}
          </header>
        </article>
      </Link>
    );
  }

  return (
    <div>
      <div className={styles.emptyThumbnail} />
      <div className={styles.emptyTitle} />
      <div className={styles.emptyDate} />
    </div>
  );
}

export default ArticleCard;
