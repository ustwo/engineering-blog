import visit from "unist-util-visit";

export default ({ markdownAST }) => {
  visit(markdownAST, "image", (node) => {
    if (node.alt.startsWith("caption:")) {
      const figureNode = {
        type: "html",
        value: `
          <figure>
            <img src="${node.url}" alt="${node.alt}" />
            <figcaption>${node.alt.replace("caption:", "").trim()}</figcaption>
          </figure>
        `
      };
      Object.assign(node, figureNode);
    }
  });
ss
  return markdownAST;
};
