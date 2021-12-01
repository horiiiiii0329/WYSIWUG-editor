import "remixicon/fonts/remixicon.css";
import { useCallback } from "react";
import {
  bold,
  italic,
  insertunorderedlist,
  insertorderedlist,
  link,
  close,
  h1,
  h2,
  h3,
  h4,
  blockquote,
  code,
} from "../icon";
import styles from "./PopupMenu.module.css";

function PopupMenu({ editor }: any) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (!editor.isEditable) return null;
  if (editor.isActive("ImageBlock")) return null;

  return (
    <div className={styles.wrapper}>
      <li className={``}>
        <span className={styles.icon} onClick={setLink}>
          {link()}
        </span>
      </li>

      <li
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={"bold"}
      >
        <span className={styles.icon}>{bold()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={"italic"}
      >
        <span className={styles.icon}>{italic()}</span>
      </li>

      <li
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <span className={styles.icon}>{h1()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span className={styles.icon}>{h2()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span className={styles.icon}>{h3()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={"bulletList"}
      >
        <span className={styles.icon}>{insertunorderedlist()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={"orderedList"}
      >
        <span className={styles.icon}>{insertorderedlist()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={"codeBlock"}
      >
        <span className={styles.icon}>{code()}</span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={"blockquote"}
      >
        <span className={styles.icon}>{blockquote()}</span>
      </li>
    </div>
  );
}

export default PopupMenu;
