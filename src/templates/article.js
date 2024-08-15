import React from "react";
import { graphql } from "gatsby";
import { format } from "small-date";
import Layout from "../components/layout";
import Author from "../components/author";
import Meta from "../components/meta";
import kebabCase from "../utils/kebab-case";
import * as styles from "./article.module.css";

const Article = ({ data }) => {
  const { frontmatter, html } = data.article;

  return (
    <Layout type="article">
      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <Author name={frontmatter.author} date={frontmatter.date} />
        <div className="smallText">
          <span>Published on </span>
          <time dateTime={frontmatter.date}>{format(new Date(frontmatter.date), "dd MMM, yyyy")}</time>
        </div>
      </header>
      <section dangerouslySetInnerHTML={{ __html: html }} id="article-content" />
    </Layout>
  );
};

export default Article;

export const Head = ({ data }) => {
  const { title, author, thumbnail, description } = data.article.frontmatter;

  return (
    <Meta 
      title={title}
      author={author}
      image={thumbnail.childImageSharp.fixed.srcWebp}
      description={description}
      timeToRead={data.article.timeToRead}
      url={`https://engineering.ustwo.com/articles/${kebabCase(title)}/`}
    />
  );
}

/* Thumbnail transformed to 1200 for twitter/og/meta stuff */
export const query = graphql`
  query($title: String) {
    article: markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        title
        author
        date
        description
        thumbnail {
          childImageSharp {
            fixed(width: 1200) {
              srcWebp
            }
          } 
        }
      }
      html
      timeToRead
    }
  }
`;
