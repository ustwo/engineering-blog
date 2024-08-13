# engineering-blog

## Table of Contents

- [engineering-blog](#engineering-blog)
	- [Table of Contents](#table-of-contents)
	- [Introduction ](#introduction-)
	- [Getting Started ](#getting-started-)
	- [GitHub Pages with Gatsby ](#github-pages-with-jekyll-)
		- [Run locally ](#run-locally-)

## Introduction <a name="introduction"></a>

A list of engineering articles from ustwo

## Getting started

### Install

Prerequisites: Node v18.12.1 

```
npm install --global gatsby-cli
npm install
```

## GitHub Pages with Gatsby <a name="gatsby"></a>

We are using GitHub Pages and GatsbyJS (React).

### Run locally <a name="run_local"></a>

```bash
gatsby develop
```
- Development server (https://localhost:8000)
- Querying Data with GraphQL (http://localhost:8000/___graphql)

## Dynamic page generation for articles

Each markdown file in `/content/articles/` is queried in `gatsby-node.js`. The 'title' assigned in the .md file is the unique differentiator - we `kebabCase()` it to create the page slug. 

For links to each article (e.g. from on the homepage) we need to `kebabCase()` the 'title' again in order to reach the aforementioned slug. This isn't ideal doing this twice. We also filter the queries twice to remove anything but markdown files in `/content/articles`.

Note: the ideal method is to use Gatsby's File System Route API. We could create a filename that infers the collection to query, e.g. `/pages/articles/{markdownRemark.frontmatter__title}.js` to creates each article page. We could then use `gatsbyPath` (as this is added to the node) when refrencing a link to it thus negating the need for kebabing anything. Alas, there is no way to filter out (that I know of) other markdown files in the filename - this alone is the reason we move to the `gatsby-node.js` method and add a filter to the queries. The unwanted markdown files in question are `/content/authors`.