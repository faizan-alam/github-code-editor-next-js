import React from "react";
import SimpleEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { EditorTypeProps } from "./EditorType";

const Editor: React.FC<EditorTypeProps> = ({ onValueChange, value }) => {
  return (
    <SimpleEditor
      value={value || ""}
      onValueChange={onValueChange}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      className="w-full  p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  );
};

export default Editor;
