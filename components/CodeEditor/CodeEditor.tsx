"use client";
import React from "react";
import Editor from "../Editor/Editor";
import { CodeEditorProps } from "./CodeEditorType";
import { useStore } from "@/context/store";

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const { fileData, handleChangeFileData } = useStore();

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
      <p className="text-gray-600 leading-6">Code:</p>
      <div className="mt-4">
        <Editor
          value={fileData}
          onValueChange={(value) => handleChangeFileData(value)}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
