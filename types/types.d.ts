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
