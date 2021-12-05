/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SideMenu from "../components/side-menu/SideMenu";
import styles from "../styles/tiptap.module.css";
import axios from "axios";
import PopupMenu from "../components/popupmenu/PopupMenu";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import "remixicon/fonts/remixicon.css";
import TextAlign from "@tiptap/extension-text-align";
import Giphy from "../components/blocks/giphy/Giphy";
import Modal from "react-modal";
import CustomImage from "../extensions/image";
import Video from "../extensions/video";

Modal.setAppElement();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
    padding: "0px",
  },
};

// eslint-disable-next-line react/display-name
export default () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({
        inline: true,
      }),
      TextAlign.configure({ types: ["paragraph", "image"] }),
      CustomImage.configure({
        HTMLAttributes: {
          class: "custom-image",
        },
      }),
      Video,
    ],

    content: `
    `,
  });

  return (
    <>
      <div className={styles.wrapper}>
        <EditorContent editor={editor} />
        {editor && (
          <BubbleMenu
            className="bubble-menu"
            tippyOptions={{ duration: 100 }}
            editor={editor}
          >
            <PopupMenu editor={editor} />
          </BubbleMenu>
        )}

        {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div style={{ position: "absolute", top: -15, left: -60 }}>
              <SideMenu
                position={{}}
                editor={editor}
                display={true || "displaySidebar"}
                gifClickHandler={openModal}
              />
            </div>
          </FloatingMenu>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <Giphy editor={editor} closeModalHandler={() => setIsOpen(false)} />
        </Modal>
      </div>
    </>
  );
};
