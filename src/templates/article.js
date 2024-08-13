import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Author from "../components/author";
import * as styles from "./article.module.css";

const Article = ({ data }) => {
  const { frontmatter, html } = data.article;

  return (
    <Layout type="article">
      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <Author name={frontmatter.author} />
      </header>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default Article;

export const Head = ({ data }) => {
  return (
    <></>
  );
}

export const query = graphql`
  query($title: String) {
    article: markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        title
        author
      }
      html
    }
  }
`;
