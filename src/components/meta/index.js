import React from "react";
import * as constants from "../../utils/constants";

export const Meta = ({
  title,
  description,
  image,
  url,
  noIndex,
  author,
  timeToRead,
  siteName
}) => {
  const metaSiteName = siteName || constants.site_name;
  const metaTitle = title ? `${title} | ${metaSiteName}` : metaSiteName;
  const metaImage = image || "https://assets.ustwo.com/images/misc/ustwo-generic-meta-image.png";

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="image" content={metaImage} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:site_name" content={metaSiteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:creator" content="ustwo" />
      {url && <meta property="og:url" content={url} />}
      {description && (
        <>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        </>
      )}
      {author && (
        <>
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content={author} />
          <meta name="author" content={author} />
        </>
      )}
      {timeToRead && (
        <>
          <meta name="twitter:label2" content="Est. reading time" />
          <meta name="twitter:data2" content={`${timeToRead} minutes`} />
        </>
      )}
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  );
};

export default Meta;
