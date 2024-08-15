import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from "./author.module.css";

const Author = ({ name }) => {
  const { authors } = useStaticQuery(graphql`
    query {
      authors: allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/(/authors/)/"  } }) {
        nodes {
          frontmatter {
            name
            role
          }
        }
      }
    }
  `);

  
  const activeAuthor = authors.nodes.filter(author => author.frontmatter.name === name);

  return (
    <div className={styles.authorSection}>
      <p className="smallText">
        <span className={styles.authorName}>{activeAuthor[0].frontmatter.name}</span> 
        <span className={styles.separator}>·</span> 
        <span className={styles.authorRole}>{activeAuthor[0].frontmatter.role}</span>
      </p>
    </div>
  );
}

export default Author;
