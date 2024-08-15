import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { format } from "small-date";
import kebabCase from "../utils/kebab-case";
import tagify from "../utils/tagify";
import * as styles from "./article-card.module.css";

const ArticleCard = ({ title, date, thumbnail, thumbnailAlt, tags, empty }) => {
  let thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData);

  if (!empty) {
    return (
      <Link to={`/articles/${kebabCase(title)}`} className={styles.articleCard} aria-label={title}>
        <article>
          <figure>
            <GatsbyImage image={thumbnailImage} className={styles.thumbnail} alt={thumbnailAlt || "Non-descript article thumbnail"} />
          </figure>
          <header>
            <h2 id={title} className="h3">{title}</h2>
            {tags && (
              <ul className={`${styles.tags} smallText`} aria-label="Article tags">
                {tagify(tags).map(tag => <li key={`${title} ${tag}`} aria-label={`Tag: ${tag}`}>{tag}</li>)}
              </ul>
            )}
            <time dateTime={date} className={`${styles.date} smallText`}>{format(new Date(date), "dd MMM, yyyy")}</time>
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
