import React from "react";
import { LinkedInIcon } from "../../assets/icons/linkedInIcon";
import { XIcon } from "../../assets/icons/xIcon";
import { InstagramIcon } from "../../assets/icons/instagramIcon";
import { GithubIcon } from "../../assets/icons/githubIcon";
import { EmailIcon } from "../../assets/icons/emailIcon";
import * as styles from "./styles.module.css";

const iconMap = {
  linkedin: <LinkedInIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
  github: <GithubIcon />,
  email: <EmailIcon />,
};

const renderIcon = (platform, url) => {
  const platformName = platform.toLowerCase();
  const isEmail = platformName === "email";

  const IconComponent = iconMap[platformName];

  if (!IconComponent) return null;

  return (
    <a
      href={isEmail ? `mailto:${url}` : url}
      target="_blank"
      rel={isEmail ? "" : "noopener noreferrer"}
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
