"use client";

import { useStore } from "@/context/store";
import { HeroSectionProps } from "./HeroSectionType";

const HeroSection: React.FC<HeroSectionProps> = ({ description, heading }) => {
  const { handleFormatCode, handleConvert } = useStore();
  return (
    <div className="flex items-center justify-between my-4">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-2">{heading}</h1>
        <p className="text-gray-600 leading-6">{description}</p>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white mr-2 py-2 px-4 rounded hover:bg-red-600"
          onClick={handleConvert}
        >
          Convert
        </button>
        <button
          className="bg-blue-500 text-white mr-2 py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleFormatCode}
        >
          Format Code
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Save File
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
