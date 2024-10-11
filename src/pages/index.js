import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "../components/grid";
import ArticleCard from "../components/article-card";
import Meta from "../components/meta";
import * as styles from "./index.module.css";

const Home = ({ data }) => {
  const articles = data.articles.nodes.map(article => (
    <li key={article.childMarkdownRemark.frontmatter.title}>
      <ArticleCard
        {...article.childMarkdownRemark.frontmatter}
        slug={`/articles/${article.relativeDirectory}`}
      />
    </li>
  ));
  
  if (articles.length < 12) {
    const placeholdersNeeded = 12 - articles.length;
  
    const placeholders = Array.from({ length: placeholdersNeeded }, (_, index) => (
      <li key={`placeholder-${index}`}><ArticleCard empty  /></li>
    ));
    
    articles.push(...placeholders);
  }

  return (
    <Layout>
      <Grid className={styles.homepageHeader}>
        <h1 className={styles.title}>{data.content.frontmatter.introTitle}</h1>
        <p className={styles.description}>{data.content.frontmatter.introMore}</p>
      </Grid>
      <Grid columns={2} list>{articles}</Grid>
    </Layout>
  );
}

export default Home;

export const Head = ({ data }) => {
  return (
    <Meta 
      description={data.content.frontmatter.description}
      url="https://engineering.ustwo.com/"
      siteName={data.content.frontmatter.title}
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
    articles: allFile(
      filter: { sourceInstanceName: { eq: "articles" }, extension: { eq: "md" } }
      sort: { childMarkdownRemark: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        relativeDirectory
        childMarkdownRemark {
          frontmatter {
            title
            series_title
            series_number
            date
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData 
              }
            }
            tags
          }
        }
      }
    }
  }
`;

