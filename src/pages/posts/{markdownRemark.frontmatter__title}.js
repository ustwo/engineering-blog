import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/layout";

const Post = ({ data }) => {
  return (
    <Layout>
      <Link to="/">Home</Link>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <p>{data.markdownRemark.frontmatter.author} | {data.markdownRemark.frontmatter.role}</p>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  );
}

export default Post;

export const query = graphql`
  query($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        author
        role
      }
      html
    }
  }
`;