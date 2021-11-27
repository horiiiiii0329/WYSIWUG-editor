import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home.module.css";

import "draft-js/dist/Draft.css";
import { getVisibleSelectionRect } from "draft-js";
import Inserter from "../components/Inserter";
import {
  RichUtils,
  DraftEditorCommand,
  EditorState,
  DraftHandleValue,
  Editor,
} from "draft-js";

const Home: NextPage = () => {
  const [mount, setMount] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [style, setStyle] = useState({ display: "none" });

  const handleKeyCommand = useCallback(
    (
      editorCommand: DraftEditorCommand,
      editorState: EditorState
    ): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(editorState, editorCommand);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    []
  );
  const shouldShowInlineStyleInserter = (editorState: EditorState) => {
    // 現在の選択範囲を取得する
    const selection = editorState.getSelection();
    // 選択範囲である SelectionState の anchor と focus の位置が同じでない
    if (selection.isCollapsed()) {
      return false;
    }
    // 現在の記事の内容を取得する
    const content = editorState.getCurrentContent();
    // 選択中の場所に Block 要素を含んでいない
    // 正確には始点と終点の内部もチェックする必要があるが、始点と終点 atomic ではないという簡易的な判定で代用している
    return (
      content.getBlockForKey(selection.getAnchorKey()).getType() !== "atomic" &&
      content.getBlockForKey(selection.getFocusKey()).getType() !== "atomic"
    );
  };

  const getInlineStylePosition = (editorState: EditorState) => {
    const rect = getVisibleSelectionRect(window);
    if (!rect) return null;
    // 必要に応じて調整する
    return { top: rect.top - 30, left: rect.left };
  };

  const onChange = useCallback((editorState: EditorState) => {
    if (shouldShowInlineStyleInserter(editorState)) {
      const rect = getInlineStylePosition(editorState);
      if (rect) {
        setStyle({ display: "block", ...rect });
      }
    } else {
      setStyle({ display: "none" });
    }
    setEditorState(editorState);
  }, []);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <Inserter
        style={style}
        onClickBoldButton={() => handleKeyCommand("bold", editorState)}
      />
      {mount && (
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
      )}
    </>
  );
};

export default Home;
