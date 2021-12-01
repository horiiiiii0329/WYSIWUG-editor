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

  return (
    <div>
      <div className="dante-menu-linkinput" style={{ width: `${11 * 43}px` }}>
        <li className={``}>
          <span className={"dante-icon"} onClick={setLink}>
            {link()}
          </span>
        </li>
      </div>

      <div className="dante-menu-buttons">
        <li
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={"bold"}
        >
          <span className={"dante-icon"}>{bold()}</span>
        </li>
        <li
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={"italic"}
        >
          <span className={"dante-icon"}>{italic()}</span>
        </li>

        <li
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <span className={"dante-icon"}>{h1()}</span>
        </li>
        <li
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <span className={"dante-icon"}>{h2()}</span>
        </li>
        <li
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <span className={"dante-icon"}>{h3()}</span>
        </li>
        <li
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={"bulletList"}
        >
          <span className={"dante-icon"}>{insertunorderedlist()}</span>
        </li>
        <li
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={"orderedList"}
        >
          <span className={"dante-icon"}>{insertorderedlist()}</span>
        </li>
        <li
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={"codeBlock"}
        >
          <span className={"dante-icon"}>{code()}</span>
        </li>
        <li
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={"blockquote"}
        >
          <span className={"dante-icon"}>{blockquote()}</span>
        </li>
      </div>
    </div>
  );
}

export default PopupMenu;
