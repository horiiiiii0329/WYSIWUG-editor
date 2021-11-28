import {
  XIcon,
  PhotographIcon,
  MinusIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import styles from "./SideMenu.module.css";
import { useState } from "react";
import { rootCertificates } from "tls";

const iconStyle = { width: "12px" };

function SideMenu({ editor }: any) {
  const [isModalopen, setIsModalOpen] = useState(false);

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
        style={isModalopen ? { opacity: 1 } : { opacity: 0 }}
      >
        <span className={styles.openIcon}>
          <PhotographIcon style={iconStyle} />
        </span>
        <span className={styles.openIcon}>
          <VideoCameraIcon style={iconStyle} />
        </span>
        <span className={styles.openIcon}>
          <MinusIcon style={iconStyle} />
        </span>
      </div>
    </div>
  );
}

export default SideMenu;
