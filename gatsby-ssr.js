import React from "react";

export function onRenderBody({ setPostBodyComponents, setHtmlAttributes }) {
  setHtmlAttributes({ lang: "en" });
  setPostBodyComponents([
    <script
      async
      defer
      src="https://scripts.withcabin.com/hello.js"
      key="cabinAnalytics-script"
    />,
  ]);
};
