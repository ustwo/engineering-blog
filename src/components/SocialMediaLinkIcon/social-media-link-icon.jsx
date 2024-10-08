import React from "react";
import { LinkedInIcon } from "../Icons/linkedInIcon";
import { XIcon } from "../Icons/xIcon";
import { InstagramIcon } from "../Icons/instagramIcon";
import { GithubIcon } from "../Icons/githubIcon";
import { EmailIcon } from "../Icons/emailIcon";
import * as styles from "./social-media-link-icon.module.css";

const iconMap = {
  linkedin: <LinkedInIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
  github: <GithubIcon />,
  email: <EmailIcon />,
};

const renderIcon = (platform, url) => {
  console.log(platform);
  const platformName = platform.toLowerCase();

  const IconComponent = iconMap[platformName];

  if (!IconComponent) return null;

  return (
    <a
      href={platformName === "email" ? `mailto:${url}` : url}
      target="_blank"
      rel={platformName === "Email" ? "" : "noopener noreferrer"}
      className={styles.iconLink}
      title={url}
    >
      <span className={styles.icon}>{IconComponent}</span>
    </a>
  );
};

const SocialMediaLinkIcons = ({ platforms }) => {
  if (Array.isArray(platforms)) {
    return (
      <div className={styles.socialIcons}>
        {platforms.map((platformInfo) => (
          <div key={platformInfo.platform}>
            {renderIcon(platformInfo.platform, platformInfo.url)}
          </div>
        ))}
      </div>
    );
  }

  if (platforms?.platform && platforms?.url) {
    return (
      <div className={styles.socialIcons}>
        {renderIcon(platforms.platform, platforms.url)}
      </div>
    );
  }

  return null;
};

export default SocialMediaLinkIcons;
