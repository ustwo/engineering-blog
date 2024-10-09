const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  /* Use allFile and sourceInstanceName (defined in gatsby-config.js) as this
  is more performant than using regex and pathname to filter only articles.
  See more in README.md  */
  const result = await graphql(
    `
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "articles" }
            extension: { eq: "md" }
          }
        ) {
          nodes {
            id
            relativeDirectory
            childMarkdownRemark {
              frontmatter {
                author
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild("Error loading Markdown result", result.errors);
  }

  const articleTemplate = path.resolve(`./src/templates/article/index.js`);
  result.data.allFile.nodes.forEach((node) => {
    createPage({
      path: `/articles/${node.relativeDirectory}`,
      component: articleTemplate,
      context: {
        id: node.id,
        authorName: node.childMarkdownRemark.frontmatter.author,
      },
    });
  });
};

/* Even if an .md file doesn't have the contactInfo field, Gatsby won't throw an
 *  error because, with the schema typing, it now understands that the field can be optional.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      contactInfo: [ContactInfo]
    }

    type ContactInfo {
      platform: String
      url: String
    }
  `);
};
