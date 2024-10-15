import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SocialMediaLinkIcons from "../social-media-link-icon";

import * as styles from "./styles.module.css";

const AuthorInfo = ({ author }) => {
  const { name, role, avatar, location, shortIntro, contactInfo } = author;
  const avatarImage = getImage(avatar?.childImageSharp?.gatsbyImageData);

  return (
    <section className={styles.authorProfileSection}>
      <h3 className={styles.authorHeading}>About the author:</h3>
      <div className={styles.authorHeader}>
        <div className={styles.authorDetails}>
          <GatsbyImage
            className={styles.authorAvatar}
            image={avatarImage}
            alt={`${name} headshot`}
          />
          <div className={styles.authorNameContainer}>
            <h4 className={styles.authorName}>{name}</h4>
            <p className={styles.authorRole}>
              {role} - {location}
            </p>
          </div>
        </div>
        <div className={styles.descriptionBoxContainer}>
          {!!shortIntro && (
            <div className={styles.descriptionBox}>
              <p className={styles.descriptionText}>{shortIntro}</p>
            </div>
          )}

          {contactInfo?.length > 0 && (
            <div className={styles.authorContactInfo}>
              <SocialMediaLinkIcons platforms={contactInfo} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorInfo;
