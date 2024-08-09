var kebabCase = function (string) {
  if (typeof string !== "string") {
    return string;
  }

  /* Repeated in gatsby-node.js */
  return string
    .replace("ö", "o") // For Malmö
    .replace("é", "e") // For Bélen
    .replace("å", "a") // For Skånetrafiken
    .replace(/["'`’()_:;?!]/g, "")
    .replace(/\W|[_]/g, "-")
    .replace(/-{2,}/, "-")
    .replace(/-$/, "") // Remove any trailing hyphens
    .toLowerCase();
};

module.exports = kebabCase;
