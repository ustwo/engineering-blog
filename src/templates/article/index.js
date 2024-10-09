import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ArticleDetails from "../components/article-details";
import ArticleCTA from "../components/article-cta";
import AuthorInfo from "../components/AuthorInfo/author-info";
import Meta from "../components/meta";
import * as styles from "./styles.module.css";

const Article = ({ data }) => {
  const { frontmatter, html } = data.article.childMarkdownRemark;
  const author = data.author.childMarkdownRemark.frontmatter;

  return (
    <Layout type="article">
      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        {<ArticleDetails author={author} date={frontmatter.date} />}
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: html }}
        id="article-content"
      />
      <footer>
        <ArticleCTA prefix={frontmatter.cta_prefix} />
        {<AuthorInfo author={author} />}
      </footer>
    </Layout>
  );
};

export default Article;

export const Head = ({ data }) => {
  const { title, author, thumbnail, description } =
    data.article.childMarkdownRemark.frontmatter;

  return (
    <Meta
      title={title}
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
