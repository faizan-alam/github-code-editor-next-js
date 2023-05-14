"use client";

import React from "react";
import { useStore } from "@/context/store";
import { HeroSectionProps } from "./HeroSectionType";
import { updateFileContent } from "@/services/api.service";

const HeroSection: React.FC<HeroSectionProps> = ({ description, heading }) => {
  const [loading, setLoading] = React.useState(false);
  const { handleFormatCode, fileData } = useStore();
  const handleUpdateFileDetails = async () => {
    try {
      setLoading(true);
      await updateFileContent(process.env.NEXT_PUBLIC_FILE_PATH, fileData);
    } catch (error) {
      console.log(
        "🚀 ~ file: HeroSection.tsx:13 ~ handleUpdateFileDetails ~ error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-between my-4">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-2">{heading}</h1>
        <p className="text-gray-600 leading-6">{description}</p>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white mr-2 py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleFormatCode}
        >
          Format Code
        </button>
        <button
          disabled={loading}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleUpdateFileDetails}
        >
          Save File
        </button>
        {loading && <p>please wait while saving</p>}
      </div>
    </div>
  );
};

export default HeroSection;
