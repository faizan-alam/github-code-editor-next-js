import { GithubFileInformation } from "../types/types";

const getFileContent = (path?: string) =>
  new Promise<GithubFileInformation>(async (res, rej) => {
    try {
      const raw = await fetch(`/api/github/file?path=${path}`, {
        cache: "no-cache",
      });

      const results = await raw.json();
      res(results as GithubFileInformation);
    } catch (error) {
      rej(error);
    }
  });

const updateFileContent = (path?: string, content?: string) =>
  new Promise(async (res, rej) => {
    try {
      const raw = await fetch(`/api/github/file`, {
        method: "PUT",
        cache: "no-cache",
        body: JSON.stringify({
          path,
          content,
        }),
      });

      const results = await raw.json();
      res(results);
    } catch (error) {
      rej(error);
    }
  });

export { getFileContent, updateFileContent };
