import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Author from "../components/author";
import Meta from "../components/meta";
import * as styles from "./article.module.css";

const Article = ({ data }) => {
  const { frontmatter, html } = data.article.childMarkdownRemark;

  return (
    <Layout type="article">
      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <Author authorName={frontmatter.author} date={frontmatter.date} />
      </header>
      <section dangerouslySetInnerHTML={{ __html: html }} id="article-content" />
    </Layout>
  );
};

export default Article;

export const Head = ({ data }) => {
  const { title, author, thumbnail, description } = data.article.childMarkdownRemark.frontmatter;

  return (
    <Meta 
      title={title}
      author={author}
      image={thumbnail.childImageSharp.fixed.srcWebp}
      description={description}
      timeToRead={data.article.timeToRead}
      url={`https://engineering.ustwo.com/articles/${data.name}/`}
    />
  );
}

/* Thumbnail transformed to 1200 for twitter/og/meta stuff */
export const query = graphql`
  query($name: String) {
    article: file(name: { eq: $name }) {
      name
      childMarkdownRemark {
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
  }
`;
