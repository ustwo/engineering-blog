import React from "react";
import Layout from "../components/layout";
import {Link} from "gatsby";

export default function Component () {
  return (
    <Layout>
      <h1>Arghhhhh</h1>
      <p>Soz, you seem to be looking for something that isn't there. Or maybe you're looking for something that's somewhere else? Either way, dunno. 🤷‍♀️</p>
      <p><Link to="/">Back to the blog's home!</Link></p>
    </Layout>
  );
}
