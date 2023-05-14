import React from "react";

const useGetFileContent = () => {
  const [data, setData] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const getFileContent = () => {
    setData(`import * as React from "react";

    type Props = {
      title: string;
      color: string;
      className: string;
      onClick: () => void;
    };
    
    export const Button: React.FC<Props> = (props) => {
      const { title, color, onClick, ...otherProps } = props;
      return (
        <button style={{ color }} onClick={onClick} {...otherProps}>
          {title}
        </button>
      );
    };
    
    Button.defaultProps = {
      color: "blue",
    };
    `);
  };

  React.useEffect(() => {
    getFileContent();
  }, []);

  return { data, loading, error };
};

export default useGetFileContent;
