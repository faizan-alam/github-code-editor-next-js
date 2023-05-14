import { getFileContent } from "@/services/api.service";
import React from "react";

const useGetFileContent = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<string>("");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getFileContent(process.env.NEXT_PUBLIC_FILE_PATH);
      setData(response.content);
    } catch (error) {
      console.log(
        "🚀 ~ file: useGetFileContent.tsx:12 ~ getData ~ error:",
        error
      );
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return { isLoading, data, getData };
};

export default useGetFileContent;
