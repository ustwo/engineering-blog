import React from "react";
import Layout from "../components/layout";
import Grid from "../components/grid";
import Meta from "../components/meta";
import * as styles from "./index.module.css";

const Home = () => {
  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Grid className={styles.homepageHeader} verticalCenter>
          <h1 className={`${styles.title} h2`}>ustwo's engineering blog</h1>
          {/* <p className={styles.description}>Coming soon</p> */}
        </Grid>
        <div style={{ height: "200px" }}>
          <p>Coming soon!</p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

export const Head = () => {
  return (
    <Meta 
      description="Enginnering Blog from ustwo coming soon"
      url="https://engineering.ustwo.com/"
    />
  );
}


