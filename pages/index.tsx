import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const Home: NextPage = () => {
  const [mount, setMount] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && <Editor editorState={editorState} onChange={setEditorState} />}
    </>
  );
};

export default Home;
