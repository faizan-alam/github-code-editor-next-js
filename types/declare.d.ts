declare module "prismjs/components/prism-core" {
  function highlight(code: string, language: any): any;
  const languages: any;

  export { highlight, languages };
}
