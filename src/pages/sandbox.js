import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const Sandbox = ({ data }) => {
  return (
    <Layout type="article">
      <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
}

export default Sandbox;

export const Head = () => (
  <meta name="robots" content="noindex, nofollow" />
);

export const query = graphql`
  query {
    content: markdownRemark(frontmatter: { name: { eq: "sandbox" } }) {
      html
    }
  }
`;