"user client";
import React, { createContext, useContext } from "react";
import useGetFileContent from "../hooks/useGetFileContent";
import { PreviewJSON } from "../types/types.d";
import { DEFAULT_JSON_PREVIEW } from "../constants";
import { JsonConverter } from "../helpers/jsonConverter";
import { formateCode } from "../helpers/prettier";

export interface StoreType {
  jsonPreview: PreviewJSON;
  rawFileData?: string;
  jsonPreviewStringify: string;
  rawFileLoading?: boolean;
  fileData: string;
  handleChangeFileData(content: string): void;
  handleJsonFileChange(content: string): void;
  handleFormatCode(): void;
}

export const Store = createContext<StoreType>({
  jsonPreview: DEFAULT_JSON_PREVIEW,
  fileData: "",
  handleChangeFileData: (content: string) => {},
  handleJsonFileChange: (content: string) => {},
  handleFormatCode: () => {},
  jsonPreviewStringify: "",
});

export const useStore = () => useContext(Store);

const jsonConverter = new JsonConverter();

export const StoreContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jsonPreview, setJsonPreview] =
    React.useState<PreviewJSON>(DEFAULT_JSON_PREVIEW);
  const [jsonPreviewStringify, setJsonPreviewStringify] =
    React.useState<string>("");
  const [fileData, setFileData] = React.useState<string>("");

  const { data: rawFileData, isLoading: rawFileLoading } = useGetFileContent();

  React.useEffect(() => {
    if (rawFileData) convertComponentToJsonPreview(rawFileData);
  }, [rawFileData]);

  const convertComponentToJsonPreview = React.useCallback((content: string) => {
    const json = jsonConverter.convertToJson(content);
    setJsonPreview(json);
    setJsonPreviewStringify(JSON.stringify(json, null, 4));
    setFileData(content);
  }, []);

  const handleFormatCode = React.useCallback(() => {
    const code = formateCode(fileData);
    convertComponentToJsonPreview(code);
  }, [fileData, convertComponentToJsonPreview]);

  const handleChangeFileData = React.useCallback(
    (content: string) => {
      setFileData(content);
      convertComponentToJsonPreview(content);
    },
    [convertComponentToJsonPreview, setFileData]
  );

  const handleJsonFileChange = React.useCallback((content: string) => {
    try {
      setJsonPreviewStringify(content);
      const json = JSON.parse(content);
      const code = jsonConverter.convertToCode(json);
      const formattedCode = formateCode(code);
      setJsonPreview(json);
      setFileData(formattedCode);
    } catch (error) {
      console.log(
        "🚀 ~ file: store.tsx:78 ~ handleJsonFileChange ~ error:",
        error
      );
    }
  }, []);

  return (
    <Store.Provider
      value={{
        jsonPreview,
        rawFileData,
        rawFileLoading,
        jsonPreviewStringify,
        fileData,
        handleChangeFileData,
        handleFormatCode,
        handleJsonFileChange,
      }}
    >
      {children}
    </Store.Provider>
  );
};
