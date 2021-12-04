import React, { useState } from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import Giphy from "./Giphy";
import styles from "./GiphyJS.module.css";

function GiphyJS({ editor, closeMenu }: any) {
  const selectImage = (giphyblock: any) => {};

  const selfDestroy = () => {
    editor.commands.deleteNode();
  };

  return (
    <NodeViewWrapper>
      <div contentEditable={false}>
        <div className={styles.modal}>
          <div className={styles.modalWrapper}>
            <button onClick={closeMenu}>close</button>
            <Giphy
              handleSelected={(data: any) => {
                selectImage(data);
              }}
            />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export default GiphyJS;
