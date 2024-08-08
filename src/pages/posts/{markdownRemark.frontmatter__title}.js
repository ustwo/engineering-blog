import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Author from "../../components/author";

const Post = ({ data }) => {
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
}

export default Post;

export const query = graphql`
  query($id: String) {
    article: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        author
      }
      html
    }
  }
`;