export interface PreviewJSONProps {
  key: string;
  value: string;
}

export interface PreviewJSON {
  componentName: string;
  props: PreviewJSONProps[];
  propsDefaults: PreviewJSONProps[];
  imports: string[];
  content: string;
}

export interface GithubFileInformation {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}
