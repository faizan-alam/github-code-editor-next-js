import prettier from "prettier/standalone";
import tsParser from "prettier/parser-typescript";

export const formateCode = (content: string) =>
  prettier.format(content, {
    parser: "typescript",
    plugins: [tsParser],
  });
