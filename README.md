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
- Querying Data with GraphQL (http://localhost:8000/\_\_\_graphql)

## Writing an article

...

### Image captions

`[caption:Alt/Caption text here](image_url.jpg)`

### Images and captions

~~We use `gatsby-remark-figure-caption` plugin to utilise `<figure>` and `<figcaption>`.~~ FAIL... out of date plugin. Is Gatsby dying?

### Assets

...

Use video not gifs... etc

## Under the hood

### Some Gatsby image magic

In markdown files, references to local images in frontmatter will get transformed so can be used with `GatsbyImage`.

### Remark Figure Caption Plugin

In `/plugins` is a bespoke plugin to handle rendering `<figure>` and `<figcaption>` for when we need to have captions for an image. It was important to keep the usual markdown image syntax `[alt/caption text](image_url.jpg)`. So the plugin looks for the alt/caption text that starts with "caption:".

### Dynamic page generation for articles

Each markdown file in `/src/content/articles/` is queried in `gatsby-node.js` and filtered using `sourceInstanceName: 'articles'` ('articles' is defined in `gatsby-config.js` in `gatsby-source-filesystem`). Each result is generated into a page using `/src/templates/article.js`.

NOTE: It is more performant to query using `allFile` and filter using `sourceInstanceName` rather than querying `allMarkdownRemark` files, as we can then only filter using `regex: "/(articles)/"` on `fileAbsolutePath`.

I'd liked to have used Gatsby's File System Route API, e.g. `/src/pages/articles/{allFile.name}.js` instead of using `gatsby-node.js`. The File System Route API generates pages based on file structure, but we would then filter `sourceInstanceName: 'articles'` in the GraphQL query after Gatsby has processed ALL files, including those we don't want, e.g. Author files. This feels inefficient since we would be processing files we intend to exclude. I wonder if there will be a way to do simple filtering in the File System Route API in the future.

### Instructions to create an author profile

1. Inside the directory `src/content/authors`, create a folder with your name, separated by hyphens (`-`), and add an `index.md` file inside it.

2. The `index.md` file should contain the following fields. `contactInfo` is the only optional field.

3. Available contact platforms are: **Email**, **Github**, **Instagram**, **LinkedIn**, and **X** (formerly Twitter).

4. The `contactInfo` field can contain one or more contact platforms. If there's no contact information, this field can be omitted.

i.e:

```yaml
---
name: Ada lovelace
role: mathematician
contact: ada.lovelace@ustwo.com
avatar: ./avatar-ada-lovelace.jpg
shortIntro: "Mathematician and writer chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine."
contactInfo:
  - platform: Github
    url: https://github.com/ada
  - platform: Email
    url: ada.lovelace@ustwo.com
  - platform: Linkedin
    url: https://www.linkedin.com/in/ada-lovelace-5304b233
---
```
