import React from "react";
import * as styles from "./grid.module.css";

const Grid = ({ children, columns, className, verticalCenter }) => {
  const classes = `
    ${styles.grid} 
    ${columns === 3 ? styles.threeColumns : ""} 
    ${className} 
    ${verticalCenter && styles.verticalCenter}
  `;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default Grid;
