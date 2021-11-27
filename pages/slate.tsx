// Import React dependencies.
import React, { useMemo, useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
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

function SlateComponent() {
  const initialValue: CustomElement[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate value={value} onChange={setValue} editor={editor}>
      <Editable />
    </Slate>
  );
}

export default SlateComponent;
