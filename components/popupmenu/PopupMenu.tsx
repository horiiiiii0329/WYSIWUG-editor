import "remixicon/fonts/remixicon.css";
import { useState } from "react";
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
  const [linkState, setLinkState] = useState<any>({
    link_mode: false,
    menu_style: {
      minWidth: "200px",
    },
  });

  const [show, setShow] = useState(false);

  if (!editor) {
    return null;
  }

  function handleInputEnter(e: any) {
    if (e.which === 13) {
      return confirmLink(e);
    }
  }

  function confirmLink(e: any) {
    e.preventDefault();
    let url = e.currentTarget.value;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    _disableLinkMode(e);
  }

  function _enableLinkMode(ev: any) {
    ev.preventDefault();
    setLinkState({
      link_mode: true,
      menu_style: {
        minWidth: "200px",
      },
    });
  }

  function _disableLinkMode(ev: any) {
    ev.preventDefault();
    setLinkState({
      link_mode: false,
      url: "",
      menu_style: {},
    });
  }

  function _clickBlockInlineStyle(style: any) {
    editor.chain().focus().setColor(style).run();
  }

  // function fixedStyles() {
  //   if (!fixed) return { width: `${11 * 43}px` };
  //   if (fixed) return { position: `sticky`, top: "0" };
  // }

  if (!editor.isEditable) return null;
  if (editor.isActive("ImageBlock")) return null;

  return (
    <div>
      <div className="dante-menu-linkinput" style={{ width: `${11 * 43}px` }}>
        <input
          className="dante-menu-input"
          placeholder={"put your souce here"}
          onKeyPress={handleInputEnter}
          //defaultValue={ this.getDefaultValue() }
        />
        <div className="dante-menu-button" onMouseDown={_disableLinkMode}>
          <span className={"dante-icon"}>{close()}</span>
        </div>
      </div>

      <div className="dante-menu-buttons" style={linkState.menu_style}>
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

        <div style={{}} onClick={_clickBlockInlineStyle} />

        <div />
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
