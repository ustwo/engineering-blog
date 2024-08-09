const path = require(`path`)
const kebabCase = require("./src/utils/kebab-case");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(articles)/" } }
        ) {
          nodes {
            id
            frontmatter {
              title
              date
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('Error loading Markdown result', result.errors)
  }

  const articleTemplate = path.resolve(`./src/templates/article.js`);
  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: `/articles/${kebabCase(node.frontmatter.title)}`,
      component: articleTemplate,
      context: {
        title: node.frontmatter.title
      }
    });
  });
}