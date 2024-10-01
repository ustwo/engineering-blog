import React from "react";
import * as styles from "./grid.module.css";

const Grid = ({ children, columns, className, verticalCenter, list }) => {
  const classes = `
    ${styles.grid} 
    ${columns === 3 ? styles.threeColumns : ""} 
    ${className} 
    ${verticalCenter ? styles.verticalCenter : ""} 
    ${list ? styles.list : ""}
  `;

  if (list) {
    return (
      <ul className={classes}>
        {children}
      </ul>
    )
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default Grid;
