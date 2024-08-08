import React from "react";
import { graphql, Link } from "gatsby";
import { format } from "small-date";
import Layout from "../components/layout";

const Home = ({ data }) => {
  return (
    <Layout>
      <h1>Engineering blog</h1>
      <p>lorem ipsum</p>
      {data.allMarkdownRemark.nodes.map(post => {
        return (
          <div>
            <Link to={post.postPath}>{post.frontmatter.title}</Link>
            <div>{format(new Date(post.frontmatter.date), "dd MMM 'yy")}</div>
          </div>
        );
      })}
    </Layout>
  );
}

export default Home;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date
        }
        postPath: gatsbyPath(filePath: "/posts/{markdownRemark.frontmatter__title}")
      }
    }
  }
`;

