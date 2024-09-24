# engineering-blog

## Introduction

A list of engineering articles from ustwo

## Getting started

### Install

Prerequisites: Node v18.12.1 

```
npm install --global gatsby-cli
npm install
```

## GitHub Pages with Gatsby

We are using GitHub Pages and GatsbyJS (React).

### Run locally

```bash
gatsby develop
```
- Development server (https://localhost:8000)
- Querying Data with GraphQL (http://localhost:8000/___graphql)

## Writing an article

...

### Assets

...

Use video not gifs... etc

## Under the hood

### Dynamic page generation for articles

Each markdown file in `/src/content/articles/` is queried in `gatsby-node.js` and filtered using `sourceInstanceName: 'articles'` ('articles' is defined in `gatsby-config.js` in `gatsby-source-filesystem`). Each result is generated into a page using `/src/templates/article.js`. 

NOTE: It is more performant to query using `allFile` and filter using `sourceInstanceName` rather than querying `allMarkdownRemark` files, as we can then only filter using `regex: "/(articles)/"` on `fileAbsolutePath`. 

I'd liked to have used Gatsby's File System Route API, e.g. `/src/pages/articles/{allFile.name}.js` instead of using `gatsby-node.js`. The File System Route API generates pages based on file structure, but we would then filter `sourceInstanceName: 'articles'` in the GraphQL query after Gatsby has processed ALL files, including those we don't want, e.g. Author files. This feels inefficient since we would be processing files we intend to exclude. I wonder if there will be a way to do simple filtering in the File System Route API in the future.
