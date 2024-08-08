import React from "react";
import "../styles/base.css";
import "../styles/global.css";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => (
  <main>
    <Header />
    {children}
    <Footer />
  </main>
);

export default Layout;
