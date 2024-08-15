import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "../components/grid";
import ArticleCard from "../components/article-card";
import * as styles from "./index.module.css";

const Home = ({ data }) => {
  const articles = data.allMarkdownRemark.nodes.map(article => (
    <ArticleCard {...article.frontmatter} key={article.frontmatter.title} />
  ));
  
  if (articles.length < 7) {
    const placeholdersNeeded = 6 - articles.length;
  
    const placeholders = Array.from({ length: placeholdersNeeded }, (_, index) => (
      <ArticleCard empty key={`placeholder-${index}`} />
    ));
    
    articles.push(...placeholders);
  }

  console.log(articles);

  return (
    <Layout>
      <div className={styles.homepageHeader}>
        <h1 className={`${styles.title} h4`}>Ipsum quia dolor sit amet.</h1>
        <p>Neque porro quisquam est ustwo engineering qui dolorem.</p>
      </div>
      <Grid columns={3}>{articles}</Grid>
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

