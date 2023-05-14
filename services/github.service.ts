import { GithubFileInformation } from "../types/types";

const REPO_URL = process.env.REPO_URL;
const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

const getFileInformation = (path: string) =>
  new Promise<GithubFileInformation>(async (res, rej) => {
    try {
      console.log(
        "🚀 ~ file: github.service.ts:16 ~ newPromise<GithubFileInformation> ~ path:",
        path
      );
      const infoRaw = await fetch(`${BASE_URL}/${REPO_URL}/${path}`, {
        cache: "no-cache",
      });
      const infoResults: GithubFileInformation = await infoRaw.json();
      const content = atob(infoResults.content);
      res({ ...infoResults, content });
    } catch (error) {
      rej(error);
    }
  });

const updateFileContent = (path: string, content: string) =>
  new Promise((resolve, reject) => {
    const url = `${BASE_URL}/${REPO_URL}/${path}`;
    fetch(url, {
      headers,
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => {
        const currentSha = data.sha;

        // Encode the new content as Base64
        const encodedContent = btoa(content);

        // Construct the request payload
        const payload = {
          message: "Update file",
          content: encodedContent,
          sha: currentSha,
        };

        // Send a PUT request to update the file
        fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-cache",
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

export { getFileInformation, updateFileContent };
