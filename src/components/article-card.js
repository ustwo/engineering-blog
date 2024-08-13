import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { format } from "small-date";
import kebabCase from "../utils/kebab-case";
import * as styles from "./article-card.module.css";

const ArticleCard = ({ title, date, thumbnail }) => {
  let thumbnailImage = getImage(thumbnail?.childImageSharp?.gatsbyImageData)

  return (
    <Link to={`/articles/${kebabCase(title)}`} className={styles.articleCard} aria-labelledby={title} role="article">
      <article>
        <figure>
          <GatsbyImage image={thumbnailImage} className={styles.thumbnail} alt="" />
        </figure>
        <header>
          <h2 id={title} className="h3">{title}</h2>
          <time datetime={date} className={styles.date}>{format(new Date(date), "dd MMM 'yy")}</time>
        </header>
      </article>
    </Link>
  );
}

export default ArticleCard;
