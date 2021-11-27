// Import React dependencies.
import React, { useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function SlateComponent() {
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate value={value} onChange={setValue} editor={editor}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === "`" && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === "code",
            });
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: match ? "paragraph" : "code" },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};
export default SlateComponent;
