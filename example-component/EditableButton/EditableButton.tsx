import * as React from "react";

type Props = {
  title: string;
  color: string;
  className: string;
  test: string;
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
