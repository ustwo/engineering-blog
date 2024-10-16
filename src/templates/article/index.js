import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import ArticleDetails from "../../components/article-details";
import ArticleCTA from "../../components/article-cta";
import Meta from "../../components/meta";
import AuthorInfo from "../../components/author-info";
import * as styles from "./styles.module.css";

const Article = ({ data }) => {
  const { frontmatter, html } = data.article.childMarkdownRemark;
  const author = data.author.childMarkdownRemark.frontmatter;
  const isSeries = frontmatter.series_title && frontmatter.series_number;

  return (
    <Layout type="article">
      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        {isSeries && <h2 className={styles.subtitle}>Part {frontmatter.series_number} of {frontmatter.series_title}</h2>}
        {<ArticleDetails author={author} date={frontmatter.date} />}
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: html }}
        id="article-content"
      />
      <footer>
        <ArticleCTA prefix={frontmatter.cta_prefix} />
        {author?.shortIntro && <AuthorInfo author={author} />}
      </footer>
    </Layout>
  );
};

export default Article;

export const Head = ({ data }) => {
  const { title, series_title, author, thumbnail, description } =
    data.article.childMarkdownRemark.frontmatter;

  return (
    <Meta
      title={title + (series_title ? " - " + series_title : "")}
      author={author}
      image={thumbnail.childImageSharp.fixed.srcWebp}
      description={description}
      timeToRead={data.article.timeToRead}
      url={`https://engineering.ustwo.com/articles/${data.article.relativeDirectory}/`}
    />
  );
};

/* Thumbnail transformed to 1200 for twitter/og/meta stuff */
export const query = graphql`
  query ($id: String!, $authorName: String!) {
    article: file(id: { eq: $id }) {
      relativeDirectory
      childMarkdownRemark {
        frontmatter {
          title
          series_title
          series_number
          author
          date
          description
          cta_prefix
          thumbnail {
            childImageSharp {
              fixed(width: 1200) {
                srcWebp
              }
            }
          }
        }
        html
        timeToRead
      }
    }

    author: file(
      sourceInstanceName: { eq: "authors" }
      childMarkdownRemark: { frontmatter: { name: { eq: $authorName } } }
    ) {
      childMarkdownRemark {
        frontmatter {
          name
          role
          location
          shortIntro
          avatar {
            childImageSharp {
              gatsbyImageData
            }
          }
          contactInfo {
            platform
            url
          }
        }
      }
    }
  }
`;
