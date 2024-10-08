const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  /* Use allFile and sourceInstanceName (defined in gatsby-config.js) as this
  is more performant than using regex and pathname to filter only articles.
  See more in README.md  */
  const result = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "articles" }, extension: { eq: "md" } }) {
          nodes {
            id
            relativeDirectory
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('Error loading Markdown result', result.errors)
  }

  const articleTemplate = path.resolve(`./src/templates/article/index.js`);
  result.data.allFile.nodes.forEach(node => {
    createPage({
      path: `/articles/${node.relativeDirectory}`,
      component: articleTemplate,
      context: {
        id: node.id
      }
    });
  });
}