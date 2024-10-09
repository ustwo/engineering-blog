# ustwo Engineering Blog

A static website so our Engineering Team can write articles and tutorials about tech.

- [Writing an article](#writing-an-article)
- [Developing](#developing)

## Writing an article

### Basics

...file structure, frontmatter, markdown, check out sandbox for various additional components such as video and captions...

#### Frontmatter

**`title`** [string][required]

Unique to all other articles. Char limit: ??

**`author`** [string]

This should be a replica of the name used in "/content/authors".

**`date`** [string]

Format: YYYY-MM-DD e.g. `2024-02-12`

**`description`** [string]

Char limit: ??

**`thumbnail`** [string]

Relative to the markdown file, e.g. `./assets/thumbnail.jpg`

**`tags`** [string]

Comma-separated values to categorise the article, e.g. `javascript, gatsby, netlify`

**`cta_prefix`** [string]

Additional copy added to the bottom of the article, e.g. `At ustwo, we're exploring how AI can be used to create and elevate great product experiences that help humans to connect.`

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

### Assets

#### Images

...even though we transform images, keep originals as low in size as possible to reduce HD space, build times and energy used.

#### Video

Same for videos, Use video not gifs... subtitles etc
Crunching, Handbrake, recommended size, (increase font size when doing code screencaptures)

### Images with captions

Use normal markdown syntax for images, but add the prefix 'caption:' to the start of the alt text, e.g. `![caption:This is the alt text but will generate as a caption](image_url.jpg)`.

---
---
---

## Developing

### Install

Prerequisites: Node v18.12.1

```
npm install --global gatsby-cli
npm install
```

### Run locally

```bash
gatsby develop
```

- Development server (https://localhost:8000)
- Query data with GraphQL (http://localhost:8000/___graphql)

### Test production locally

```bash
gatsby clean && gatsby build && gatsby serve
```
- Local version of production build (https://localhost:9000)

---
---
---

## Under the hood notes

In markdown files, references to local images in frontmatter will get transformed so they can be used with `GatsbyImage`.

In `/plugins` is a bespoke plugin to handle rendering `<figure>` and `<figcaption>` for when we need to have captions for an image. It was important to keep the usual markdown image syntax `[alt/caption text](image_url.jpg)`. So the plugin looks for the alt/caption text that starts with "caption:".

Each markdown file in `/src/content/articles/` is queried in `gatsby-node.js` and filtered using `sourceInstanceName: 'articles'` ('articles' is defined in `gatsby-config.js` in `gatsby-source-filesystem` options). Each result is generated into a page using `/src/templates/article.js`. 

NOTE: It is more performant to query using `allFile` and filter using `sourceInstanceName` rather than querying `allMarkdownRemark` files, as we can then only filter using `regex: "/(articles)/"` on `fileAbsolutePath`.

I'd liked to have used Gatsby's File System Route API, e.g. `/src/pages/articles/{allFile.name}.js` instead of using `gatsby-node.js`. The File System Route API generates pages based on file structure, but we would then filter `sourceInstanceName: 'articles'` in the GraphQL query after Gatsby has processed ALL files, including those we don't want, e.g. Author files. This feels inefficient since we would be processing files we intend to exclude. I wonder if there will be a way to do simple filtering in the File System Route API in the future.
