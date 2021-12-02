import {
  XIcon,
  PhotographIcon,
  MinusIcon,
  VideoCameraIcon,
  FilmIcon,
} from "@heroicons/react/outline";
import styles from "./SideMenu.module.css";
import { useState, useEffect } from "react";
import GiphyJS from "../blocks/giphy/GiphyJS";
import { giphyLogo } from "../icon";

const iconStyle = { width: "12px" };

function SideMenu({ editor }: any) {
  const [isModalopen, setIsModalOpen] = useState(false);

  const setHorizontal = () => editor.chain().focus().setHorizontalRule().run();

  const addImage = () => {
    const url = window.prompt("画像リンクを入力してください。");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

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
        <span className={styles.openIcon} onClick={addImage}>
          <PhotographIcon style={iconStyle} />
        </span>

        <span className={styles.openIcon}>
          <FilmIcon style={iconStyle} />
        </span>
        <span className={styles.openIcon} onClick={setHorizontal}>
          <MinusIcon style={iconStyle} />
        </span>
      </div>
    </div>
  );
}

export default SideMenu;
