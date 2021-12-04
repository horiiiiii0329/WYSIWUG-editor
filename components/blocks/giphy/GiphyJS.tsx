import React, { useState } from "react";
import Giphy from "./Giphy";
import styles from "./GiphyJS.module.css";

function GiphyJS({ editor, closeMenu }: any) {
  return (
    <div contentEditable={false}>
      <div className={styles.modal}>
        <div className={styles.modalWrapper}>
          <Giphy
            handleSelected={(data: any) => {
              selectImage(data);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GiphyJS;
