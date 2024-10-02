# gatsby-source-remark-figure-caption

Target images in markdown to be rendered inside `<figure>` and use alt text as captions inside `<figcaption>`.

## How to use?

Normal markdown syntax for images is used. In order to activate, add the prefix 'caption:' to the start of the image alt text.

```
![caption:Image caption text goes here](./image-name.png)
```

## How does it work?

Using `unist-util-visit` plugin, it cycles throught the node tree looking for 'images'. Then any with the prefix 'caption:' of their `node.alt` text are replaced with an enhanced markup version that includes the appropriate html elements.