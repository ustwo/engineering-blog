import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "../components/grid";
import ArticleCard from "../components/article-card";
import Meta from "../components/meta";
import * as styles from "./index.module.css";

const Home = ({ data }) => {
  const articles = data.allFile.nodes.map(article => (
    <ArticleCard
      {...article.childMarkdownRemark.frontmatter}
      name={article.name}
      key={article.childMarkdownRemark.frontmatter.title}
    />
  ));
  
  if (articles.length < 7) {
    const placeholdersNeeded = 6 - articles.length;
  
    const placeholders = Array.from({ length: placeholdersNeeded }, (_, index) => (
      <ArticleCard empty key={`placeholder-${index}`} />
    ));
    
    articles.push(...placeholders);
  }

  return (
    <Layout>
      <div className={styles.homepageHeader}>
        <h1 className={`${styles.title} h4`}>{data.content.frontmatter.introTitle}</h1>
        <p>{data.content.frontmatter.introMore}</p>
      </div>
      <Grid columns={3}>{articles}</Grid>
    </Layout>
  );
}

export default Home;

export const Head = ({ data }) => {
  return (
    <Meta 
      description={data.content.frontmatter.description}
      url="https://engineering.ustwo.com/"
    />
  );
}

export const query = graphql`
  query {
    content: markdownRemark(frontmatter: { name: { eq: "main" } }) {
      frontmatter {
        description
        introTitle
        introMore
      }
    }
    allFile(
      filter: { sourceInstanceName: { eq: "articles" } }
      sort: { childMarkdownRemark: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        name
        childMarkdownRemark {
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
  }
`;

