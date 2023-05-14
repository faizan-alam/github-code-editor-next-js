"use client";

import React from "react";
import { useStore } from "@/context/store";
import Editor from "../Editor/Editor";

const JsonPreview: React.FC<{}> = () => {
  const { jsonPreviewStringify, handleJsonFileChange } = useStore();

  const hasError = React.useMemo(() => {
    try {
      JSON.parse(jsonPreviewStringify);
      return false;
    } catch (error) {
      return true;
    }
  }, [jsonPreviewStringify]);

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
      <p className="text-gray-600 leading-6">
        Preview:
        {hasError && <sup className="text-red-600">(Error in Json)</sup>}
      </p>
      <div className="mt-4">
        <Editor
          value={jsonPreviewStringify}
          onValueChange={(value) => handleJsonFileChange(value)}
        />
      </div>
    </div>
  );
};

export default JsonPreview;
