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

// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line react/display-name
export default () => {
  const [gif, setGif] = useState([]);
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: `
     aa
    `,
  });

  useEffect(() => {
    search("", "trend");
  }, []);

  const search = (term: any, kind = "search") => {
    const url =
      kind === "search"
        ? `https://api.giphy.com/v1/gifs/search?q=lololol`
        : `https://api.giphy.com/v1/gifs/trending?q=lololol`;
    const link = `${url}&limit=10&api_key=KpSOOvXbvl7rusKvx7Axl8BFI2QjmYXY`;

    axios
      .get(link)
      .then((response) => {
        // handle success
        setGif(response.data.data);
        // console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
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
        <FloatingMenu editor={editor}>
          <div style={{ position: "absolute", top: -15, left: -60 }}>
            <SideMenu
              position={{}}
              editor={editor}
              display={true || "displaySidebar"}
            />
          </div>
        </FloatingMenu>
      )}
    </div>
  );
};
