import React from "react";
import { graphql, Link } from "gatsby";
import { format } from "small-date";
import Layout from "../components/layout";
import kebabCase from "../utils/kebab-case";

const Home = ({ data }) => {
  return (
    <Layout>
      <h1>Engineering blog</h1>
      {data.allMarkdownRemark.nodes.map(article => {
        return (
          <div>
            <Link to={`/articles/${kebabCase(article.frontmatter.title)}`}>{article.frontmatter.title} - {format(new Date(article.frontmatter.date), "dd MMM 'yy")}</Link>
          </div>
        );
      })}
    </Layout>
  );
}

export default Home;

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fileAbsolutePath: { regex: "/(articles)/" } }
    ) {
      nodes {
        frontmatter {
          title
          date
        }
      }
    }
  }
`;

