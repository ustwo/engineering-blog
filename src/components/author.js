import React from "react";
import { graphql, useStaticQuery } from "gatsby";

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
    <p>{activeAuthor[0].frontmatter.name} | {activeAuthor[0].frontmatter.role}</p>
  );
}

export default Author;
