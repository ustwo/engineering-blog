import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { format } from "small-date";
import kebabCase from "../utils/kebab-case";
import * as styles from "./article-card.module.css";

const ArticleCard = ({ title, date, thumbnail, thumbnailAlt, tags }) => {
  let thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData)

  return (
    <Link to={`/articles/${kebabCase(title)}`} className={styles.articleCard} aria-labelledby={title} role="article">
      <article>
        <figure>
          <GatsbyImage image={thumbnailImage} className={styles.thumbnail} alt={thumbnailAlt || "Non-descript article thumbnail"} />
        </figure>
        <header>
          <h2 id={title} className="h3">{title}</h2>
          <time dateTime={date} className={`${styles.date} smallText`}>{format(new Date(date), "dd MMM, yyyy")}</time>
        </header>
      </article>
    </Link>
  );
}

export default ArticleCard;
