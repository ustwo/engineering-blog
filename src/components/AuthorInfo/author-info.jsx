import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SocialMediaLinkIcons from "../SocialMediaLinkIcon/social-media-link-icon";
import * as styles from "./author-info.module.css";

const AuthorInfo = ({ authorName }) => {
  const { authors } = useStaticQuery(graphql`
    query {
      authors: allFile(
        filter: {
          sourceInstanceName: { eq: "authors" }
          extension: { eq: "md" }
        }
      ) {
        nodes {
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
    }
  `);

  const activeAuthor = authors.nodes.filter(
    (author) => author.childMarkdownRemark.frontmatter.name === authorName
  );
  const { name, role, avatar, shortIntro, contactInfo } =
    activeAuthor[0].childMarkdownRemark.frontmatter;
  const avatarImage = getImage(avatar?.childImageSharp?.gatsbyImageData);

  return (
    <section className={styles.authorProfileSection}>
      <h3 className={styles.authorHeading}>Author:</h3>
      <div className={styles.authorHeader}>
        <GatsbyImage
          className={styles.authorAvatar}
          image={avatarImage}
          alt={`${name} headshot`}
        />
        <div className={styles.authorDetails}>
          <h4 className={styles.authorName}>{name}</h4>
          <p className={styles.authorRole}>{role}</p>
        </div>
      </div>

      {!!shortIntro && (
        <div className={styles.quoteBox}>
          <p className={styles.quoteText}>{shortIntro}</p>
        </div>
      )}

      {!!contactInfo && (
        <div className={styles.authorContactInfo}>
          <SocialMediaLinkIcons platforms={contactInfo} />
        </div>
      )}
    </section>
  );
};

export default AuthorInfo;
