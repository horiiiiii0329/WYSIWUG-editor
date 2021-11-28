import {
  XIcon,
  PhotographIcon,
  MinusIcon,
  VideoCameraIcon,
  FilmIcon,
} from "@heroicons/react/outline";
import styles from "./SideMenu.module.css";
import { useState, useEffect } from "react";
import { rootCertificates } from "tls";
import GiphyJS from "../blocks/giphy/GiphyJS";

const iconStyle = { width: "12px" };

function SideMenu({ display, position, widgets, editor, fixed }: any) {
  const [isModalopen, setIsModalOpen] = useState(false);

  useEffect(() => {
    editor.on("selectionUpdate", () => {
      // The selection has changed.
      setIsModalOpen(false);
    });
  }, [editor]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.openIcon}
        onClick={() => setIsModalOpen(!isModalopen)}
        style={
          isModalopen
            ? { transform: "rotate(0deg)" }
            : { transform: "rotate(45deg)" }
        }
      >
        <XIcon style={iconStyle} />
      </div>
      <div
        className={styles.tooltip}
        style={isModalopen ? { opacity: 1 } : { opacity: 0, display: "none" }}
      >
        <span className={styles.openIcon}>
          <PhotographIcon style={iconStyle} />
        </span>
        <span className={styles.openIcon}>
          <VideoCameraIcon style={iconStyle} />
        </span>
        <span className={styles.openIcon}>
          <FilmIcon style={iconStyle} />
          <GiphyJS
            editor={editor}
            closeMenu={() => {
              setIsModalOpen(false);
            }}
          />
        </span>
        <span className={styles.openIcon}>
          <MinusIcon style={iconStyle} />
        </span>
      </div>
    </div>
  );
}

export default SideMenu;
