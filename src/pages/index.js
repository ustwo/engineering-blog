import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "../components/grid";
import ArticleCard from "../components/article-card";

const Home = ({ data }) => {
  return (
    <Layout>
      <h1>Engineering blog</h1>
      <Grid columns={3}>
        {data.allMarkdownRemark.nodes.map(article => <ArticleCard {...article.frontmatter} />)}
      </Grid>
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
          thumbnail {
            childImageSharp {
              gatsbyImageData 
            }
          }
        }
      }
    }
  }
`;

