import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Author from "../components/author";

const Article = ({ data }) => {
  const { frontmatter, html } = data.article;

  return (
    <Layout>
      <article>
        <header>
          <h1>{frontmatter.title}</h1>
          <Author name={frontmatter.author} />
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
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
