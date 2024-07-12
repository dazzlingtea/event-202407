import React from "react";
import styles from './ProgressBar.module.scss';

const ProgressBar = () => {

  // progressBar가 전체 막대 길이, progress가 진행도

  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} />
    </div>
  );
};

export default ProgressBar;