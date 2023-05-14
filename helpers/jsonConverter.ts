import { PreviewJSON, PreviewJSONProps } from "../types/types";

export class JsonConverter {
  private getComponentName(content: string): string {
    const componentNameRegex = /export\s+const\s+(\w+)\s*:/;
    const match = content.match(componentNameRegex)?.[1];
    return match || "";
  }
  private getImportStatements(content: string): string[] {
    const importRegex = /^import\s+.*?['"](.*?)['"]/gm;
    const importMatches = content.match(importRegex);
    return importMatches || [];
  }
  private getDefaultProps(
    content: string,
    componentName: string
  ): PreviewJSONProps[] {
    const regex = new RegExp(
      `${componentName}\\.defaultProps\\s*=\\s*({[\\s\\S]*?});`
    );

    const match = content.match(regex);
    const defaultPropsArray =
      match?.[1]
        .replace(/[\[\]"'{}\s]+/g, "")
        .trim()
        .split(/[:,;]/) || [];

    return this.generatePropsFrom1dArray(defaultPropsArray);
  }

  private generatePropsFrom1dArray(
    propsArrayOfString: string[]
  ): PreviewJSONProps[] {
    const props: PreviewJSONProps[] = [];

    for (let index = 0; index < propsArrayOfString.length; index += 2) {
      if (propsArrayOfString[index] && propsArrayOfString[index + 1]) {
        props.push({
          key: propsArrayOfString[index],
          value: String(propsArrayOfString[index + 1]).trim(),
        });
      }
    }

    return props;
  }

  private getProps(content: string): PreviewJSONProps[] {
    const propsRegex = /type Props = {([^}]+)}/;
    const propsArrayOfString =
      content
        ?.match?.(propsRegex)?.[1]
        .trim()
        .replace(/\n\s*/g, "")
        .trim()
        .split(/[:,;]/) || [];

    return this.generatePropsFrom1dArray(propsArrayOfString);
  }

  private getContent(content: string): string {
    const regex = /return\s*\((.*?)\);/s;
    const match = content.match(regex);

    return match ? match[1].trim() : "";
  }
  public convertToJson(content: string): PreviewJSON {
    const componentName = this.getComponentName(content);
    const imports = this.getImportStatements(content);
    const props = this.getProps(content);
    const propsDefaults = this.getDefaultProps(content, componentName);
    const returnBody = this.getContent(content);

    return {
      componentName,
      props,
      propsDefaults,
      imports,
      content: returnBody,
    };
  }
  private convertImportStatement(content: string[]): string {
    return content.map((row) => row).join(";");
  }
  private convertInterfaceStatement(
    content: PreviewJSONProps[],
    componentName: string
  ): string {
    const propsString = content.reduce((acc, { key, value }) => {
      return acc + key + ": " + value + ", ";
    }, "");
    const trimmedPropsString = propsString.slice(0, -2);

    return `
    type ${componentName}Props = {
    ${trimmedPropsString}
    };
    `;
  }
  private convertBodyStatement(
    props: PreviewJSONProps[],
    componentName: string,
    body: string
  ): string {
    const propsString = props.reduce((acc, { key, value }) => {
      return acc + key + ", ";
    }, "");

    return `
    export const ${componentName}: React.FC<${componentName}Props> = (props) => {
      const { ${propsString}...otherProps } = props;
      return (
        ${body}
      );
    };
    `;
  }
  private convertDefaultPropsStatement(
    props: PreviewJSONProps[],
    defaultProps: PreviewJSONProps[],
    componentName: string
  ): string {
    const propsString = defaultProps.reduce((acc, { key, value }) => {
      const currentPropsType = props.find((row) => row.key === key)?.value;
      const isString =
        String(currentPropsType).toLocaleLowerCase() === "string";
      const newValue = isString ? `"${value}"` : value;

      return acc + key + ": " + value + ", ";
    }, "");

    return `
    ${componentName}.defaultProps = {
      ${propsString}
    };
    `;
  }
  public convertToCode(json: PreviewJSON): string {
    const componentName = json.componentName;
    const imports = this.convertImportStatement(json.imports);
    const propInterface = this.convertInterfaceStatement(
      json.props,
      componentName
    );
    const body = this.convertBodyStatement(
      json.props,
      componentName,
      json.content
    );
    const defaultProps = this.convertDefaultPropsStatement(
      json.props,
      json.propsDefaults,
      componentName
    );

    return `
    ${imports}
    
    ${propInterface}

    ${body}

    ${defaultProps}

    `;
  }
}
