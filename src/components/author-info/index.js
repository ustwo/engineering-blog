import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SocialMediaLinkIcons from "../social-media-link-icon";
import * as styles from "./author-info.module.css";

const AuthorInfo = ({ author }) => {
  const { name, role, avatar, shortIntro, contactInfo } = author;
  const avatarImage = getImage(avatar?.childImageSharp?.gatsbyImageData);

  return (
    <section className={styles.authorProfileSection}>
      <h3 className={styles.authorHeading}>About the author:</h3>
      <div className={styles.authorHeader}>
        <GatsbyImage
          className={styles.authorAvatar}
          image={avatarImage}
          alt={`${name} headshot`}
        />
        <div className={styles.authorDetails}>
          <h4 className={styles.authorName}>{name}</h4>
          <p className={styles.authorRole}>{role}</p>
        </div>
      </div>

      {!!shortIntro && (
        <div className={styles.quoteBox}>
          <p className={styles.quoteText}>{shortIntro}</p>
        </div>
      )}

      {contactInfo?.length > 0 && (
        <div className={styles.authorContactInfo}>
          <SocialMediaLinkIcons platforms={contactInfo} />
        </div>
      )}
    </section>
  );
};

export default AuthorInfo;
