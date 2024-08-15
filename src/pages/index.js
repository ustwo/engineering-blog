import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "../components/grid";
import ArticleCard from "../components/article-card";

const Home = ({ data }) => {
  return (
    <Layout>
      {/* <p>
        Neque porro quisquam est ustwo engineering qui dolorem.<br /> 
        Ipsum quia dolor sit amet.
      </p> */}
      <Grid columns={3}>
        {data.allMarkdownRemark.nodes.map(article => <ArticleCard {...article.frontmatter} key={article.frontmatter.title} />)}
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
          thumbnailAlt
          tags
        }
      }
    }
  }
`;

