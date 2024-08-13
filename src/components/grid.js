import React from "react";
import * as styles from "./grid.module.css";

const Grid = ({ children, columns }) => {
  const classes = `
    ${styles.grid} 
    ${columns === 3 ? styles.threeColumns : ""}
  `;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default Grid;
