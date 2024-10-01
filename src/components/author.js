import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { format } from "small-date";
import * as styles from "./author.module.css";

const Author = ({ authorName, date }) => {
  const { authors } = useStaticQuery(graphql`
    query {
      authors: allFile(filter: { sourceInstanceName: { eq: "authors" }, extension: { eq: "md" } }) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              name
              role
              avatar {
                childImageSharp {
                  gatsbyImageData 
                }
              }
            }
          }
        }
      }
    }
  `);

  const activeAuthor = authors.nodes.filter(author => author.childMarkdownRemark.frontmatter.name === authorName);
  const { name, role, avatar } = activeAuthor[0].childMarkdownRemark.frontmatter;
  const avatarImage = getImage(avatar?.childImageSharp?.gatsbyImageData);

  return (
    <div className={styles.authorSection}>
      <GatsbyImage className={styles.avatar} image={avatarImage} alt="" />
      <div className="smallText">
        <p>
          <span className={styles.authorName}>{name}</span> 
          <span className={styles.separator}>·</span> 
          <span>{role}</span>
        </p>
        <p>
          <span>Published on </span>
          <time dateTime={date}>{format(new Date(date), "MMM dd, yyyy")}</time>
        </p>
      </div>
    </div>
  );
}

export default Author;
