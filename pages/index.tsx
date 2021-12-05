import React, { useEffect, useRef } from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import editorStyles from "./editorStyles.module.css";
import { useState } from "react";
import { EditorState } from "draft-js";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";
import styles from "../styles/Home.module.css";

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [sideToolbarPlugin];

function Aaa() {
  const [editorState, setEditorState] = useState(() =>
    createEditorStateWithText("")
  );

  useEffect(() => {
    // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
    setEditorState(createEditorStateWithText("aaaa"));
  }, []);

  const editor = useRef<Editor | null>(null);

  const onChange = (value: EditorState): void => {
    setEditorState(value);
  };

  const focus = (): void => {
    editor.current?.focus();
  };

  return (
    <div className={styles.editor} onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={[sideToolbarPlugin]}
        ref={(element) => {
          editor.current = element;
        }}
      />
      <SideToolbar />
    </div>
  );
}

export default Aaa;
