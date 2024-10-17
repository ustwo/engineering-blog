# ustwo Engineering Blog

A static website so our Engineering Team can write articles and tutorials about tech.

- [Writing an article](#writing-an-article)
- [Developing](#developing)
- [Analytics](#analytics)
- [Notes](#notes)

## Writing an article

### Basics

Each article is self-contained inside its own directory (markdown and assets) and found in `/src/content/articles/`. 

1. Create a new directory - the name is the slug of the article, so make it snake-case, keep it terse and avoid special characters. 

2. Inside, create a `index.md` file - this will contain the article markdown as well as various meta data as frontmatter:

**`title`** [string][required]

Unique to all other articles.

**`series_title`** [string][optional]

Title for the series of articles, if applicable.

**`series_number`** [int][optional]

This article's number in the series of article, if applicable.

*Note that if an article is in a series, both the title and number fields should be supplied*

**`author`** [string]

This should replicate the name used in `/content/authors` (see creating author below).

**`date`** [string]

Format: YYYY-MM-DD eg, `2024-02-12`

**`description`** [string]

Displayed on article card and used for meta and social network descriptions. Char limit: 155

**`thumbnail`** [string]

This should live in the assets dir, eg, `./assets/thumbnail.jpg`. It should be 1200px wide and no less than 630px high.

**`tags`** [string]

Comma-separated values to categorise the article, eg, `javascript, gatsby, netlify`

**`cta_prefix`** [string]

Additional copy added to the bottom of the article, eg, 'At ustwo, we're exploring how AI can be used to create and elevate great product experiences that help humans to connect.'

### Writing style
The following style guidelines have been requested by our marketing team to maintain consistency with ustwo's other outward facing media:
1. Use UK English spelling
1. No Oxford commas
1. Sentence case titles
1. Sentence case capitalisation in headings of article sections
1. No punctuation in Latin expressions - should read as eg, ie with a comma afterward
1. Time - 12 hour with am or pm - eg, 6:00pm
1. Date - day, date month, year - eg, Thursday, 26 September, 2024

### Assets

Please be responsible with regards to assets size.

Files should not drastically exceed what is absolutely necessary, no matter the magic we use to transform assets to digestible sizes or the fast transfer speeds we expect out users to view them with. Ultimately, we want to keep HD space, build times, transfers times and energy used to a minimum.

#### Images

For now, images for each article are kept in the repo, eg, `/src/contents/articles/article-name/assets`.

As a rule of thumb, images should be between 2000-3000px wide and be landscape. 

Don't just use PNG as a matter of course - consider the contents of the image and determine whether JPG is more appropriate, ie, is it inherently a photo or illustration/diagram? We use `gatsby-plugin-image` to transform images to `webp` but the originals should not be unecessarily large to begin with - please no 5Mb PNGs!

#### Video

**No gifs!** Use mp4. 

For now, we host videos on our [assets server](https://assets.ustwo.com). Please crunch and encode video with an application like [Handbrake](https://handbrake.fr/) using H.264 at 1080p ideally. Video size? I reckon if you're over 1-2Mb per 10s then you need to crunch more!

If you are screen-recording your IDE, it might be worth considering increasing the font size.

If possible, consider adding a subtitle file of type `.vtt`.

```html
<video controls style="width: 100%">
  <source
    src="https://assets.ustwo.com/engineering/article-name/video-name.mp4" type="video/mp4"
  />
  <track kind="subtitles" label="Off" default="true" />
  <track
    kind="subtitles"
    label="English Subtitles"
    default="false"
    srcLang="en"
    src="https://assets.ustwo.com/engineering/article-name/video-name.vtt"
  />
  Your browser does not support the video tag.
  Description: This video shows xyz.
</video>
```

For autoplaying, gif-like videos:

```html
<video autoplay loop playsinline muted style="width: 100%">
  <source
    src="https://assets.ustwo.com/engineering/article-name/video-name.mp4"
    type="video/mp4" 
  />
</video>
```

### Authors

1. Inside the directory `src/content/authors`, create a folder with your name, separated by hyphens (`-`), and add an `index.md` file inside it.

2. The `index.md` file should contain the following fields. `contactInfo` is the only optional field.

3. **`name`** [string][required] This should be exactly what is written in the `author` field in the frontmatter of the article markdown file.

4. Available contact platforms are: **Email**, **Github**, **Instagram**, **LinkedIn** and **X** (formerly Twitter).

5. The `contactInfo` field can contain one or more contact platforms. If there's no contact information, this field can be omitted.

i.e:

```yaml
---
name: Ada lovelace
role: mathematician
contact: ada.lovelace@ustwo.com
avatar: ./avatar-ada-lovelace.jpg
location: London, UK
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

### Markdown features and tips

Check out the [sandbox](https://engineering.ustwo.com/sandbox) and `/src/content/sandbox.md` to see how various features are used, including image captions, code blocks and tables.

#### Images with captions

You can utilise `<figure>` and `<figcaption>` by using standard markdown syntax for images, but add the prefix 'caption:' to the start of the alt text, eg, `![caption:This is the alt text but will generate as a caption](image_url.jpg)`.


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
- Query data with GraphQL (http://localhost:8000/\_\_\_graphql)

### Test production locally

```bash◊
gatsby clean && gatsby build && gatsby serve
```

- Local version of production build (https://localhost:9000)

---

---

---

## Analytics

We use Cabin Analytics which is a privacy-first, carbon conscious
web analytics service - no need for cookies and banners.

There is a [public facing dashboard](https://withcabin.com/public/1frxZjjcIkyv) or contact phil-linnell (phil@ustwo.com) for access to the Cabin account.

---

---

---

## Notes

In markdown files, references to local images in frontmatter will get transformed so they can be used with `GatsbyImage`.

In `/plugins` is a bespoke plugin to handle rendering `<figure>` and `<figcaption>` for when we need to have captions for an image. It was important to keep the usual markdown image syntax `[alt/caption text](image_url.jpg)`. So the plugin looks for the alt/caption text that starts with "caption:".

Each markdown file in `/src/content/articles/` is queried in `gatsby-node.js` and filtered using `sourceInstanceName: 'articles'` ('articles' is defined in `gatsby-config.js` in `gatsby-source-filesystem` options). Each result is generated into a page using `/src/templates/article.js`.

NOTE: It is more performant to query using `allFile` and filter using `sourceInstanceName` rather than querying `allMarkdownRemark` files, as we can then only filter using `regex: "/(articles)/"` on `fileAbsolutePath`.

I'd liked to have used Gatsby's File System Route API, eg, `/src/pages/articles/{allFile.name}.js` instead of using `gatsby-node.js`. The File System Route API generates pages based on file structure, but we would then filter `sourceInstanceName: 'articles'` in the GraphQL query after Gatsby has processed ALL files, including those we don't want, eg, Author files. This feels inefficient since we would be processing files we intend to exclude. I wonder if there will be a way to do simple filtering in the File System Route API in the future.
