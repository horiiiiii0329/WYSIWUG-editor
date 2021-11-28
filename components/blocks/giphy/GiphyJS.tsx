import React, { useState } from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import Giphy from "./giphy";
import styles from "./GiphyJS.module.css";

function GiphyJS({ editor, closeMenu }: any) {
  const getAspectRatio = (w: any, h: any) => {
    const maxWidth = 1000;
    const maxHeight = 1000;
    let ratio = 0;
    let width = w; // Current image width
    let height = h; // Current image height

    // Check if the current width is larger than the max
    if (width > maxWidth) {
      ratio = maxWidth / width; // get ratio for scaling image
      height = height * ratio; // Reset height to match scaled image
      width = width * ratio; // Reset width to match scaled image

      // Check if current height is larger than max
    } else if (height > maxHeight) {
      ratio = maxHeight / height; // get ratio for scaling image
      width = width * ratio; // Reset width to match scaled image
      height = height * ratio; // Reset height to match scaled image
    }

    const fill_ratio = (height / width) * 100;
    const result = { width, height, ratio: fill_ratio };
    // console.log result
    return result;
  };

  const selectImage = (giphyblock: any) => {
    const { url, height, width } = giphyblock.images.original;

    editor.commands.insertContent({
      type: "ImageBlock",
      attrs: {
        url: url,
        aspect_ratio: getAspectRatio(width, height),
        forceUpload: true,
      },
    });
  };

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
